import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema.js";
import { env } from "../lib/helper/env.js";

if (!env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL environment variable is not set. Please set it to connect to your Neon database."
  );
}

const pool = new pg.Pool({
  connectionString: env.DATABASE_URL,
});
export const db = drizzle(pool, { schema });
