import express from "express";
import { AppConfig } from "../config.js";

// In-memory store: IP address -> { count: number, resetAt: number }
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

// Window duration in milliseconds (60 seconds)
const WINDOW_MS = 60 * 1000;

export function rateLimitMiddleware(
    config: AppConfig
) {
    const { RATE_LIMIT_THRESHOLD } = config;

    return function (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    // Get or initialize rate limit data for this IP
    let rateLimitData = rateLimitStore.get(clientIp);

    // If no data exists or window has expired, reset
    if (!rateLimitData || now >= rateLimitData.resetAt) {
        rateLimitData = {
            count: 0,
            resetAt: now + WINDOW_MS,
        };
        rateLimitStore.set(clientIp, rateLimitData);
    }

    // Increment request count
    rateLimitData.count++;

    // Calculate remaining requests
    const remaining = Math.max(0, RATE_LIMIT_THRESHOLD - rateLimitData.count);

    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', RATE_LIMIT_THRESHOLD.toString());
    res.setHeader('X-RateLimit-Remaining', remaining.toString());

    // Check if threshold exceeded
    if (rateLimitData.count > RATE_LIMIT_THRESHOLD) {
        return res.status(429).json({
            message: 'Too Many Requests',
        });
    }

    // Clean up old entries periodically (simple cleanup - remove expired entries)
    // This prevents memory leaks from storing IPs indefinitely
    if (Math.random() < 0.01) { // 1% chance on each request
        const expiredIps: string[] = [];
        for (const [ip, data] of rateLimitStore.entries()) {
            if (now >= data.resetAt) {
                expiredIps.push(ip);
            }
        }
        expiredIps.forEach(ip => rateLimitStore.delete(ip));
    }

    next();
    }
}

