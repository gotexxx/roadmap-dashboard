import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db/client";
import { migrate } from "@/lib/db/migrate";
import { redis } from "@/lib/redis/client";

export async function GET(req: NextRequest) {
  try {
    await migrate();
    const dbSuccess = await pool.query(`SELECT 1`); // Simple query to check DB connectivity
    const redisSuccess = await redis.ping(); // Check Redis connectivity
    return NextResponse.json({
      db: dbSuccess.rowCount === 1,
      redis: redisSuccess === "PONG",
    });
  } catch (err) {
    console.warn("DB error:", (err as Error).message);
    return NextResponse.json({ db: false, redis: false });
  }
}
