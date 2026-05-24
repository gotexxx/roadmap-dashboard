import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db/client";
import { migrate } from "@/lib/db/migrate";
import { invalidateCache, setCache } from "@/lib/redis/client";

export async function POST(req: NextRequest) {
  try {
    const { xp, level, streak, totalHoursStudied } = await req.json();

    await migrate();
    await pool.query(
      `UPDATE user_progress
       SET xp = $1, level = $2, streak = $3, total_hours_studied = $4, last_activity_at = NOW(), updated_at = NOW()
       WHERE user_id = 'default'`,
      [xp, level, streak, totalHoursStudied],
    );

    setCache(`user_progress:default`, null); // Invalidate cache immediately after update
    invalidateCache("user_progress:*"); // Clear stale cache after update

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.warn("DB error:", (err as Error).message);
    return NextResponse.json({ ok: true, persisted: false });
  }
}
