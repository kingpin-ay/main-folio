import { loginSchema, signUpSchema } from "../validation-schema/user.schema.js";
import type { ParsedFormValue } from "hono/types";
import type { Context } from "hono";

export function loginValidator(
  value: Record<string, ParsedFormValue | ParsedFormValue[]>,
  c: Context<any, string, {}>
) {
  const parsed = loginSchema.safeParse(value);
  if (!parsed.success) {
    return c.text("Invalid!", 401);
  }
  return parsed.data;
}

export function signUpValidator(
  value: Record<string, ParsedFormValue | ParsedFormValue[]>,
  c: Context<any, string, {}>
) {
  const parsed = signUpSchema.safeParse(value);
  if (!parsed.success) {
    return c.text("Invalid!", 401);
  }
  return parsed.data;
}
