import Redis from "ioredis";

const globalForRedis = globalThis as unknown as { redis: Redis };

function createRedis() {
  const url = process.env.REDIS_URL || "redis://:redis_secret@localhost:6379";
  const redis = new Redis(url, {
    maxRetriesPerRequest: 3,
    lazyConnect: true,
    enableOfflineQueue: false,
  });

  redis.on("error", (err) => {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Redis connection error (non-fatal):", err.message);
    }
  });

  return redis;
}

export const redis: Redis = globalForRedis.redis || createRedis();

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;

export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const val = await redis.get(key);
    return val ? JSON.parse(val) : null;
  } catch {
    return null;
  }
}

export async function setCache(
  key: string,
  value: unknown,
  ttlSeconds = 300,
): Promise<void> {
  try {
    await redis.setex(key, ttlSeconds, JSON.stringify(value));
  } catch {
    // Redis unavailable — graceful fallback
  }
}

export async function invalidateCache(pattern: string): Promise<void> {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) await redis.del(...keys);
  } catch {
    // Graceful fallback
  }
}
