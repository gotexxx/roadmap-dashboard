import { NextResponse } from "next/server";
import { pool } from "@/lib/db/client";
import { redis } from "@/lib/redis/client";

export async function GET() {
  const [db, red] = await Promise.allSettled([
    pool.query("SELECT 1"),
    redis.ping(),
  ]);

  return NextResponse.json({
    db: db.status === "fulfilled",
    redis: red.status === "fulfilled" && red.value === "PONG",
  });
}
