/**
 * Type-level validation that a Zod schema's output is compatible with a Prisma type.
 * 
 * This uses a conditional type that evaluates to `true` if compatible,
 * or produces a compile error if not. The check catches:
 * - Missing required fields
 */

/**
 * Get required keys from T (keys that are not optional)
 */
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T];

/**
 * Check if SchemaOutput has all required keys from Target
 */
type HasAllRequiredKeys<Target, SchemaOutput> = 
  RequiredKeys<Target> extends keyof SchemaOutput ? true : false;

/**
 * Internal helper that produces a descriptive error message
 */
type SchemaCheckResult<Target, Schema extends { _output: unknown }> = 
  HasAllRequiredKeys<Target, Schema["_output"]> extends true 
    ? true 
    : "Schema is missing required fields from target type";

/**
 * Compile-time assertion for schema compatibility.
 * 
 * Usage: Assign this type alias to a constant to trigger a compile error
 * if the schema doesn't match:
 * 
 * @example
 * // This will error if email is removed from the schema:
 * const _check: SchemaCheck<Prisma.UserCreateInput, typeof UserCreateInputSchema> = true;
 */
export type SchemaCheck<Target, Schema extends { _output: unknown }> = 
  SchemaCheckResult<Target, Schema> extends true ? true : never;

/**
 * Utility to enforce schema check at compile time.
 * Call this function to trigger an error if the schema is incompatible.
 */
export function assertSchema<Target, Schema extends { _output: unknown }>(
  _schema: Schema,
  _check: SchemaCheck<Target, Schema>
): void {}
