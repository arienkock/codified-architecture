import bcrypt from "bcrypt";

import { RequestContext, ValidationError } from "./types";
import {
  UserUpdateRequest,
  UserUpdateRequestSchema,
  UserUpdateUseCaseResponse,
  ErrorResponse,
} from "../../domain-seam/types";

export interface PatchUsersIdHandlerParams {
  pathParams: { id: number };
  queryParams: Record<string, never>;
  headerParams: Record<string, never>;
  requestBody: UserUpdateRequest;
  requestContext: RequestContext;
}

export type PatchUsersIdHandlerResponse =
  | { status: "200"; body: UserUpdateUseCaseResponse }
  | { status: "400"; body: ErrorResponse }
  | { status: "401"; body: ErrorResponse }
  | { status: "403"; body: ErrorResponse }
  | { status: "404"; body: ErrorResponse }
  | { status: "422"; body: ErrorResponse }
  | { status: "500"; body: ErrorResponse };

const SALT_ROUNDS = 12;

const isKnownRequestErrorWithCode = (
  error: unknown,
  code: string
): error is { code: string } => {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  const maybeError = error as { code?: unknown };
  return typeof maybeError.code === "string" && maybeError.code === code;
};

const buildErrorResponse = (
  status: "400" | "401" | "403" | "404" | "422" | "500",
  errors: ValidationError[]
): PatchUsersIdHandlerResponse => ({
  status,
  body: {
    meta: {
      success: false,
      errors,
    },
  },
});

export async function handleRequest(
  params: PatchUsersIdHandlerParams
): Promise<PatchUsersIdHandlerResponse> {
  const validationResult = UserUpdateRequestSchema.safeParse(
    params.requestBody
  );

  if (!validationResult.success) {
    const validationErrors: ValidationError[] =
      validationResult.error.issues.map((issue) => {
        const fieldPath = issue.path.join(".");

        if (fieldPath.length > 0) {
          return {
            code: "VALIDATION_ERROR",
            message: issue.message,
            field: fieldPath,
          };
        }

        return {
          code: "VALIDATION_ERROR",
          message: issue.message,
        };
      });

    return buildErrorResponse("400", validationErrors);
  }

  const { requestContext, pathParams } = params;
  const { prisma } = requestContext.app;
  const { id } = pathParams;

  const { password, ...rest } = validationResult.data;

  const updateData: Parameters<typeof prisma.user.update>[0]["data"] = {
    ...Object.fromEntries(
      Object.entries(rest).filter(([, value]) => value !== undefined)
    ),
  };

  if (password !== undefined) {
    updateData.hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  }

  if (Object.keys(updateData).length === 0) {
    return buildErrorResponse("422", [
      {
        code: "NO_FIELDS_TO_UPDATE",
        message: "At least one field must be provided to update.",
      },
    ]);
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    const responseBody: UserUpdateUseCaseResponse = {
      meta: {
        success: true,
      },
      data: updatedUser,
    };

    return {
      status: "200",
      body: responseBody,
    };
  } catch (error: unknown) {
    if (isKnownRequestErrorWithCode(error, "P2025")) {
      return buildErrorResponse("404", [
        {
          code: "NOT_FOUND",
          message: "User not found.",
        },
      ]);
    }

    if (isKnownRequestErrorWithCode(error, "P2002")) {
      return buildErrorResponse("422", [
        {
          code: "EMAIL_ALREADY_EXISTS",
          message: "A user with this email already exists.",
          field: "email",
        },
      ]);
    }

    console.error("Unexpected error updating user", error);

    return buildErrorResponse("500", [
      {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred.",
      },
    ]);
  }
}
