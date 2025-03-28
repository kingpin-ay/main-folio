import { z } from "zod";

export const loginSchema = z.object({
  userName: z.string().min(8),
  password: z.string().min(8),
});
export const signUpSchema = z.object({
  userName: z.string().min(8),
  password: z.string().min(8),
  firstName: z.string().min(1).max(25),
  lastName: z.string().min(1).max(25),
  bio: z.string().min(1),
});
