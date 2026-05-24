import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db/client";
import { migrate } from "@/lib/db/migrate";

export async function POST(req: NextRequest) {
  try {
    const { taskId, completed } = await req.json();
    if (!taskId) return NextResponse.json({ error: "taskId required" }, { status: 400 });

    await migrate();
    const today = new Date().toISOString().split("T")[0];
    await pool.query(
      `INSERT INTO daily_tasks (user_id, task_id, date, completed, completed_at)
       VALUES ('default', $1, $2, $3, $4)
       ON CONFLICT (user_id, task_id, date) DO UPDATE
       SET completed = EXCLUDED.completed, completed_at = EXCLUDED.completed_at`,
      [taskId, today, completed, completed ? new Date() : null]
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.warn("DB error:", (err as Error).message);
    return NextResponse.json({ ok: true, persisted: false });
  }
}
