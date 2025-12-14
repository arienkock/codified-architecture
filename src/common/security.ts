import z from "zod";

export interface SecurityContext {
    currentUserId: string;
    isAdmin?: boolean;
    currentOrganizationId?: number;
}

export interface SecurityFilterGenerator {
    (securityContext: SecurityContext, requestParams: z.ZodTypeAny): any;
}