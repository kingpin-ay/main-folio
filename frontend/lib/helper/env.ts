import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  NEXT_PUBLIC_BASE_URL: z.string(),
  DEV_ENV: z.enum(["DEVELOPMENT", "PRODUCTION"]).default("PRODUCTION"),
});

type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env) as Env;
