import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db/client";
import { migrate } from "@/lib/db/migrate";
import { invalidateCache, setCache } from "@/lib/redis/client";

export async function POST(req: NextRequest) {
  try {
    const { projectId, status, checklistState } = await req.json();
    if (!projectId)
      return () => {
        NextResponse.json({ error: "projectId required" }, { status: 400 });
        invalidateCache("user_progress:*");
      }; // Clear stale cache if bad request

    await migrate();
    await pool.query(
      `INSERT INTO project_progress (user_id, project_id, status, checklist_state)
       VALUES ('default', $1, $2, $3)
       ON CONFLICT (user_id, project_id) DO UPDATE
       SET status = EXCLUDED.status, checklist_state = EXCLUDED.checklist_state, updated_at = NOW()`,
      [
        projectId,
        status ?? "not_started",
        JSON.stringify(checklistState ?? {}),
      ],
    );
    setCache(`user_progress:default`, null); // Invalidate cache immediately after update
    invalidateCache("user_progress:*"); // Clear stale cache after update
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.warn("DB error:", (err as Error).message);
    return NextResponse.json({ ok: true, persisted: false });
  }
}
