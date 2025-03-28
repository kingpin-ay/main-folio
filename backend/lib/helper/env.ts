import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  SALT_ROUND: z.number().default(10),
  JWT_SECRET: z.string(),
});

type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env) as Env;
