import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  SALT_ROUND: z
    .string()
    .transform((val) => parseInt(val))
    .default("10"),
  JWT_SECRET: z.string().default(""),
  REFRESH_JWT_SECRET: z.string().default(""),
  COOKIE_SECRET: z.string().default(""),
});

type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env) as Env;
