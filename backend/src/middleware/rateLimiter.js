import ratelimit from "../config/upstash.js"

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-rate-limit")
        if (!success) return res.status(429).json({ success: false, message: "Too many requests", data: [] })
        next()
    } catch (error) {
        console.log("ERROR WHILE RATE LIMITING", error)
        next(error)
    }
}
export default rateLimiter