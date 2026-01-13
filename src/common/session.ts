import * as jose from 'jose';
import express from 'express';
import { SecurityContext } from './security.js';
import { defaultConfig } from '../config.js';

/**
 * Creates a session cookie for a user and sets it on the response.
 * This is the single source of truth for session cookie creation.
 */
export async function createSessionCookie(res: express.Response, securityContext: SecurityContext): Promise<void> {
    const secret = new TextEncoder().encode(defaultConfig.JWT_SECRET);
    const sessionCookie = await new jose.SignJWT(securityContext as any)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(secret);
    
    res.cookie('session', sessionCookie, { httpOnly: true, secure: false });
}


