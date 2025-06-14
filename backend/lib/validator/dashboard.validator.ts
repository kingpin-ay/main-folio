import { Context } from "hono";
import {
  aboutTabValidatorSchema,
  contactTabValidatorSchema,
  profileTabValidatorSchema,
  projectsValidatorSchema,
  stackGroupValidatorSchema,
  stackItemValidatorSchema,
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

export const contactTabValidator = (
  value: any,
  c: Context<any, string, {}>
) => {
  const parsed = contactTabValidatorSchema.safeParse(value);
  if (!parsed.success) {
    return c.text("Invalid!", 401);
  }
  return parsed.data;
};

export const stackGroupValidator = (
  value: any,
  c: Context<any, string, {}>
) => {
  const parsed = stackGroupValidatorSchema.safeParse(value);
  if (!parsed.success) {
    return c.text("Invalid!", 401);
  }
  return parsed.data;
};

export const stackItemValidator = (value: any, c: Context<any, string, {}>) => {
  const parsed = stackItemValidatorSchema.safeParse(value);
  if (!parsed.success) {
    return c.text("Invalid!", 401);
  }
  return parsed.data;
};

export const projectsValidator = (value: any, c: Context<any, string, {}>) => {
  const parsed = projectsValidatorSchema.safeParse(value);
  if (!parsed.success) {
    return c.text("Invalid!", 401);
  }
  return parsed.data;
};
