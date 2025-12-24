import z from "zod";
import { ResourceDefinition } from "../../common/resource-definition.js";
import bcrypt from "bcrypt";
import { SecurityContext } from "../../common/security.js";
import { PrismaClient } from "../../persistence/generated/prisma/index.js";
import { createSessionCookie } from "../../common/session.js";
import express from "express";

const loginResourceDefinition: ResourceDefinition = {
    name: "login",
    namePlural: "logins",
    isSynthetic: true,
    create: {
        requestBodySchema: z.object({
            email: z.string().email(),
            password: z.string(),
        }).strict(),
        validators: [],
        authorizers: [],
        postCreateHook: handleLogin,
    },
}

export default loginResourceDefinition;

async function handleLogin(
    createdEntity: any,
    db: PrismaClient,
    securityContext: SecurityContext,
    res: express.Response
): Promise<void> {
    // For synthetic resources, createdEntity contains the request body
    const body = createdEntity as { email: string; password: string };
    
    // Find user by email
    const user = await db.user.findUnique({
        where: { email: body.email },
    });

    if (!user) {
        const error: any = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
    }

    // Verify password
    const passwordValid = await bcrypt.compare(body.password, user.hashedPassword);
    if (!passwordValid) {
        const error: any = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
    }

    // Check if user is a global admin by checking if they are admin of a non-personal organization
    // (Personal organizations have isCurrent: true, so we check for admin membership with isCurrent: false)
    const globalAdminMembership = await db.userOrganization.findFirst({
        where: {
            userId: user.id,
            isAdmin: true,
            isCurrent: false,
        },
    });

    const isAdmin = !!globalAdminMembership;

    // Create session cookie using shared utility
    await createSessionCookie(res, {
        currentUserId: user.id.toString(),
        isAdmin: isAdmin,
    });
}

