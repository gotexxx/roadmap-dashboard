import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db/client";
import { migrate } from "@/lib/db/migrate";

export async function POST(req: NextRequest) {
  try {
    const { nodeId, status } = await req.json();
    if (!nodeId || !status) return NextResponse.json({ error: "nodeId and status required" }, { status: 400 });

    await migrate();
    await pool.query(
      `INSERT INTO roadmap_progress (user_id, node_id, status, completed_at)
       VALUES ('default', $1, $2, $3)
       ON CONFLICT (user_id, node_id) DO UPDATE
       SET status = EXCLUDED.status, completed_at = EXCLUDED.completed_at, updated_at = NOW()`,
      [nodeId, status, status === "completed" ? new Date() : null]
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.warn("DB error:", (err as Error).message);
    return NextResponse.json({ ok: true, persisted: false });
  }
}
