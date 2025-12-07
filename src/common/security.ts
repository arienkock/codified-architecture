import z from "zod";

export interface SecurityContext {
    currentUserId?: number;
    isAdmin?: boolean;
}

export interface SecurityFilterGenerator {
    (securityContext: SecurityContext, requestParams: z.ZodTypeAny): any;
}