import { Ratelimit } from '@upstash/ratelimit';
import "dotenv/config"
import { Redis } from '@upstash/redis'
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    // 100 req per second per user
    limiter: Ratelimit.slidingWindow(100, "60 s")
})

export default ratelimit