import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db/client";
import { migrate } from "@/lib/db/migrate";

export async function POST(req: NextRequest) {
  try {
    const { achievementId } = await req.json();
    if (!achievementId) return NextResponse.json({ error: "achievementId required" }, { status: 400 });

    await migrate();
    await pool.query(
      `INSERT INTO achievements (user_id, achievement_id) VALUES ('default', $1) ON CONFLICT DO NOTHING`,
      [achievementId]
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.warn("DB error:", (err as Error).message);
    return NextResponse.json({ ok: true, persisted: false });
  }
}
