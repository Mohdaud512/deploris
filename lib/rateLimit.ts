import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { serverEnv } from './env';

/**
 * Per-IP sliding-window rate limit. Used by every mutating API route.
 *
 * Falls back to a per-process in-memory limiter in dev / when Upstash env vars
 * are absent. The in-memory limiter is BEST-EFFORT only do not deploy without
 * Upstash configured for production traffic.
 */

const memoryBuckets = new Map<string, { count: number; reset: number }>();

function memoryLimit(
  ip: string,
  limit: number,
  windowMs: number,
): { success: boolean; remaining: number } {
  const now = Date.now();
  const bucket = memoryBuckets.get(ip);
  if (!bucket || bucket.reset < now) {
    memoryBuckets.set(ip, { count: 1, reset: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }
  if (bucket.count >= limit) return { success: false, remaining: 0 };
  bucket.count += 1;
  return { success: true, remaining: limit - bucket.count };
}

let redis: Redis | null = null;
function getRedis(): Redis | null {
  if (!serverEnv.UPSTASH_REDIS_REST_URL || !serverEnv.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  if (!redis) {
    redis = new Redis({
      url: serverEnv.UPSTASH_REDIS_REST_URL,
      token: serverEnv.UPSTASH_REDIS_REST_TOKEN,
    });
  }
  return redis;
}

const limiters = new Map<string, Ratelimit>();
function getUpstashLimiter(key: string, limit: number, windowSeconds: number): Ratelimit | null {
  const r = getRedis();
  if (!r) return null;
  const existing = limiters.get(key);
  if (existing) return existing;
  const rl = new Ratelimit({
    redis: r,
    limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
    analytics: false,
    prefix: `rl:${key}`,
  });
  limiters.set(key, rl);
  return rl;
}

export type RateLimitKey = 'contact' | 'quote' | 'newsletter' | 'chat' | 'data-request' | 'csp';

const policies: Record<RateLimitKey, { limit: number; windowSeconds: number }> = {
  contact: { limit: 5, windowSeconds: 60 * 10 },
  quote: { limit: 5, windowSeconds: 60 * 10 },
  newsletter: { limit: 5, windowSeconds: 60 * 60 },
  chat: { limit: 30, windowSeconds: 60 },
  'data-request': { limit: 3, windowSeconds: 60 * 60 * 24 },
  csp: { limit: 60, windowSeconds: 60 },
};

export async function checkRateLimit(
  key: RateLimitKey,
  ip: string,
): Promise<{ success: boolean; remaining: number }> {
  const p = policies[key];
  const upstash = getUpstashLimiter(key, p.limit, p.windowSeconds);
  if (upstash) {
    const r = await upstash.limit(ip);
    return { success: r.success, remaining: r.remaining };
  }
  return memoryLimit(`${key}:${ip}`, p.limit, p.windowSeconds * 1000);
}

/** Best-effort client IP extraction from Vercel / standard forwarded headers. */
export function clientIp(headers: Headers): string {
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0];
    if (first) return first.trim();
  }
  return headers.get('x-real-ip') ?? '0.0.0.0';
}
