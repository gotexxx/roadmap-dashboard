import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db/client";
import { migrate } from "@/lib/db/migrate";
import { getCache, invalidateCache, setCache } from "@/lib/redis/client";

export async function GET() {
  try {
    const cached = await getCache<{ history: { date: string; xpGained: number }[] }>("xp:history:default");
    if (cached) return NextResponse.json(cached);

    await migrate();

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const res = await pool.query(
      `SELECT date::text, SUM(xp_gained)::int AS xp_gained
       FROM xp_history
       WHERE user_id = 'default' AND date >= $1
       GROUP BY date
       ORDER BY date ASC`,
      [thirtyDaysAgo.toISOString().split("T")[0]],
    );

    const result = {
      history: res.rows.map((r) => ({ date: r.date, xpGained: r.xp_gained })),
    };

    setCache("xp:history:default", result, 600);
    return NextResponse.json(result);
  } catch (err) {
    console.warn("DB error:", (err as Error).message);
    return NextResponse.json({ history: [] }, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { xpGained } = await req.json();
    if (typeof xpGained !== "number") {
      return NextResponse.json({ error: "xpGained must be a number" }, { status: 400 });
    }

    await migrate();

    const today = new Date().toISOString().split("T")[0];
    await pool.query(
      `INSERT INTO xp_history (user_id, date, xp_gained) VALUES ('default', $1, $2)`,
      [today, xpGained],
    );

    invalidateCache("xp:history:default");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.warn("DB error:", (err as Error).message);
    return NextResponse.json({ ok: true, persisted: false });
  }
}
