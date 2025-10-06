import bcrypt from "bcrypt";

import { RequestContext, ValidationError } from "./types";
import {
  UserCreateRequest,
  UserCreateRequestSchema,
  UserCreateUseCaseResponse,
  ErrorResponse,
} from "../../domain-seam/types";

export interface PostUsersHandlerParams {
  pathParams: Record<string, never>;
  queryParams: Record<string, never>;
  headerParams: Record<string, never>;
  requestBody: UserCreateRequest;
  requestContext: RequestContext;
}

export type PostUsersHandlerResponse =
  | { status: "201"; body: UserCreateUseCaseResponse }
  | { status: "400"; body: ErrorResponse }
  | { status: "401"; body: ErrorResponse }
  | { status: "403"; body: ErrorResponse }
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
  status:
    | "400"
    | "401"
    | "403"
    | "422"
    | "500",
  errors: ValidationError[]
): PostUsersHandlerResponse => ({
  status,
  body: {
    meta: {
      success: false,
      errors,
    },
  },
});

export async function handleRequest(
  params: PostUsersHandlerParams
): Promise<PostUsersHandlerResponse> {
  const validationResult = UserCreateRequestSchema.safeParse(
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

  const { requestContext } = params;
  const { prisma } = requestContext.app;
  const { password, ...rest } = validationResult.data;
  const { name, ...userWithoutName } = rest;

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const createData = {
      ...userWithoutName,
      hashedPassword,
      ...(name !== undefined ? { name } : {}),
    };

    const createdUser = await prisma.user.create({
      data: createData as Parameters<typeof prisma.user.create>[0]["data"],
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    const responseBody: UserCreateUseCaseResponse = {
      meta: {
        success: true,
      },
      data: createdUser,
    };

    return {
      status: "201",
      body: responseBody,
    };
  } catch (error: unknown) {
    if (isKnownRequestErrorWithCode(error, "P2002")) {
      return buildErrorResponse("422", [
        {
          code: "EMAIL_ALREADY_EXISTS",
          message: "A user with this email already exists.",
          field: "email",
        },
      ]);
    }

    console.error("Unexpected error creating user", error);

    return buildErrorResponse("500", [
      {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred.",
      },
    ]);
  }
}
