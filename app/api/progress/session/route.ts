import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db/client";
import { migrate } from "@/lib/db/migrate";
import { redis } from "@/lib/redis/client";

export async function POST(req: NextRequest) {
  try {
    const streak = await redis.get("xp:streak:default");
    const lastday = await redis.get("xp:lastday:default");

    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    if (lastday === today) {
      return NextResponse.json({ action: "same-day" });
    }
    if (lastday === yesterdayStr) {
      await redis.set(
        "xp:streak:default",
        streak ? (parseInt(streak) + 1).toString() : "1",
      );
    }
    const { xpGained } = await req.json();
    if (typeof xpGained !== "number") {
      return NextResponse.json(
        { error: "xpGained must be a number" },
        { status: 400 },
      );
    }

    await migrate();

    await pool.query(
      `INSERT INTO xp_history (user_id, date, xp_gained) VALUES ('default', $1, $2)`,
      [today, xpGained],
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.warn("DB error:", (err as Error).message);
    return NextResponse.json({ ok: true, persisted: false });
  }
}
