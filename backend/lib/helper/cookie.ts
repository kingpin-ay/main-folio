import { CookieOptions } from "hono/utils/cookie";
import { env } from "./env";

export function cookieConfig(
  maxAgeHour: number,
  expiresDays: number
): CookieOptions {
  return {
    path: "/",
    secure: env.DEV_ENV === "PRODUCTION",
    domain: env.COOKIE_DOMAIN,
    httpOnly: true,
    maxAge: 60 * 60 * maxAgeHour,
    expires: new Date(Date.now() + expiresDays * 24 * 60 * 60 * 1000),
    sameSite: "none" as const,
  } as CookieOptions;
}
