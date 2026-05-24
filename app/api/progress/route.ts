import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db/client";
import { migrate } from "@/lib/db/migrate";
import { getCache, invalidateCache, setCache } from "@/lib/redis/client";

async function ensureDB() {
  await migrate();
}

export async function GET() {
  try {
    const cache = await getCache("user_progress:default");
    if (cache) return NextResponse.json(cache);

    await ensureDB();

    const today = new Date().toISOString().split("T")[0];

    const [statsRes, nodesRes, projectsRes, achievementsRes, dailyRes] =
      await Promise.all([
        pool.query(
          `SELECT xp, level, streak, total_hours_studied, last_activity_at FROM user_progress WHERE user_id = 'default' LIMIT 1`,
        ),
        pool.query(
          `SELECT node_id, status, completed_at FROM roadmap_progress WHERE user_id = 'default'`,
        ),
        pool.query(
          `SELECT project_id, status, checklist_state FROM project_progress WHERE user_id = 'default'`,
        ),
        pool.query(
          `SELECT achievement_id FROM achievements WHERE user_id = 'default'`,
        ),
        pool.query(
          `SELECT task_id, completed FROM daily_tasks WHERE user_id = 'default' AND date = $1`,
          [today],
        ),
      ]);

    const statsRow = statsRes.rows[0];
    const nodeProgress: Record<
      string,
      { status: string; completedAt?: string }
    > = {};
    for (const row of nodesRes.rows) {
      nodeProgress[row.node_id] = {
        status: row.status,
        completedAt: row.completed_at ?? undefined,
      };
    }

    const projectProgress: Record<
      string,
      { status: string; checklistState: Record<string, boolean> }
    > = {};
    for (const row of projectsRes.rows) {
      projectProgress[row.project_id] = {
        status: row.status,
        checklistState: row.checklist_state ?? {},
      };
    }

    setCache(
      "user_progress:default",
      {
        stats: statsRow
          ? {
              xp: statsRow.xp,
              level: statsRow.level,
              streak: statsRow.streak,
              totalHoursStudied: statsRow.total_hours_studied,
              lastActivityAt: statsRow.last_activity_at,
            }
          : null,
        nodeProgress,
        projectProgress,
        achievements: achievementsRes.rows.map((r) => r.achievement_id),
        dailyTaskCompletions: Object.fromEntries(
          dailyRes.rows.map((r) => [r.task_id, r.completed]),
        ),
      },
      60,
    ); // Cache for 1 minute
    return NextResponse.json({
      stats: statsRow
        ? {
            xp: statsRow.xp,
            level: statsRow.level,
            streak: statsRow.streak,
            totalHoursStudied: statsRow.total_hours_studied,
            lastActivityAt: statsRow.last_activity_at,
          }
        : null,
      nodeProgress,
      projectProgress,
      achievements: achievementsRes.rows.map((r) => r.achievement_id),
      dailyTaskCompletions: Object.fromEntries(
        dailyRes.rows.map((r) => [r.task_id, r.completed]),
      ),
    });
  } catch (err) {
    console.warn("DB unavailable:", (err as Error).message);
    invalidateCache("user_progress:*"); // Clear any potentially stale cache
    return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
  }
}
