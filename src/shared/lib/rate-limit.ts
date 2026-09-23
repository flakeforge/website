import 'server-only'

type Window = { count: number; resetAt: number }

const buckets = new Map<string, Window>()

/**
 * Fixed-window, in-memory rate limiter. State lives in the process, so it resets on restart
 * and is not shared between replicas.
 * @param key Caller identity, usually the client IP plus an action name.
 * @param limit Allowed hits per window.
 * @param windowMs Window length in milliseconds.
 * @returns `true` when the hit is allowed, `false` when the caller is over the limit.
 */
export const hitRateLimit = (key: string, limit: number, windowMs: number): boolean => {
  const now = Date.now()
  const current = buckets.get(key)

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    if (buckets.size > 5000) {
      for (const [bucketKey, bucket] of buckets) {
        if (bucket.resetAt <= now) buckets.delete(bucketKey)
      }
    }
    return true
  }

  current.count += 1
  return current.count <= limit
}
