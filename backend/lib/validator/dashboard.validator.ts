import { Context } from "hono";
import {
  aboutTabValidatorSchema,
  profileTabValidatorSchema,
} from "../validation-schema/user.schema";

export const profileTabValidator = (
  value: any,
  c: Context<any, string, {}>
) => {
  const parsed = profileTabValidatorSchema.safeParse(value);
  if (!parsed.success) {
    return c.text("Invalid!", 401);
  }
  return parsed.data;
};

export const aboutTabValidator = (value: any, c: Context<any, string, {}>) => {
  const parsed = aboutTabValidatorSchema.safeParse(value);
  if (!parsed.success) {
    return c.text("Invalid!", 401);
  }
  return parsed.data;
};
