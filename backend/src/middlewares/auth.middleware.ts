import { Context, Next } from "hono";
import { getSignedCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { env } from "../../lib/helper/env";

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const { login_token, refresh_token }: { login_token?: string; refresh_token?: string } =
      await getSignedCookie(c, env.COOKIE_SECRET);

    if (!login_token || !refresh_token) {
      return c.json({ 
        error: "Unauthorized: No token provided",
        status: 401,
        message: "Authentication required"
      }, 401);
    }

    try {
      const payload = await verify(login_token, env.JWT_SECRET);
      c.set("user", payload);
      await next();
    } catch (verifyError) {
      return c.json({ 
        error: "Unauthorized: Invalid token",
        status: 401,
        message: "Session expired or invalid"
      }, 401);
    }
  } catch (e) {
    return c.json({ 
      error: "Unauthorized: Authentication failed",
      status: 401,
      message: "Unable to process authentication"
    }, 401);
  }
};
