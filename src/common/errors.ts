import z from "zod";

export interface GenericErrorResponse {
    message: string;
    errors?: z.core.$ZodIssue[];
}