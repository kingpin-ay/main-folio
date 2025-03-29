import { Context, Next } from "hono";
import { getSignedCookie, setSignedCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { env } from "../../lib/helper/env";

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const {
      login_token,
      refresh_token,
    }: { login_token?: string; refresh_token?: string } = await getSignedCookie(
      c,
      env.COOKIE_SECRET
    );

    if (!login_token || !refresh_token) {
      return c.json({ error: "Unauthorized: No token provided" }, 401);
    }

    const payload = await verify(login_token, env.JWT_SECRET);
    c.set("user", payload); // Store user data in context with type safety
    await next(); // Proceed to the next handler
  } catch (e) {
    console.log(e);
    return c.json({ error: "Unauthorized: Invalid token" }, 401);
  }
};
