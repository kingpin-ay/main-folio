import type { Context } from "hono";
import type { ParsedFormValue } from "hono/types";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";
import { users } from "../db/schema.js";
import { hashPassword, matchPassword } from "../lib/helper/security.js";
import { sign } from "hono/jwt";
import { env } from "../lib/helper/env.js";
import { deleteCookie, setSignedCookie } from "hono/cookie";
import { cookieConfig } from "../lib/helper/cookie.js";

export async function login(
  c: Context<
    {},
    "/login",
    {
      in: {
        form: {
          username: ParsedFormValue | ParsedFormValue[];
          password: ParsedFormValue | ParsedFormValue[];
        };
      };
      out: {
        form: {
          username: ParsedFormValue | ParsedFormValue[];
          password: ParsedFormValue | ParsedFormValue[];
        };
      };
    }
  >
) {
  const { username, password } = c.req.valid("form");

  const user = await db.query.users.findFirst({
    columns: {
      id: true,
      userName: true,
      password: true,
    },
    where: eq(users.userName, username as string),
  });

  if (!user) {
    return c.text("User not found", 404);
  }

  const valid = matchPassword(password as string, user.password);

  if (valid) {
    const payload = {
      username: user.userName,
      id: user.id,
      jwtOrigin: "/auth/login",
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
    };
    const token = await sign(payload, env.JWT_SECRET);

    const refreshTokenPayload = {
      username: user.userName,
      id: user.id,
      jwtOrigin: "/auth/login",
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 1 week
    };
    const refreshToken = await sign(
      refreshTokenPayload,
      env.REFRESH_JWT_SECRET
    );

    // set signed cookie for the jwt tokens
    await setSignedCookie(
      c,
      "login_token",
      token,
      env.COOKIE_SECRET,
      cookieConfig(10, 1)
    );

    // set signed token for the refresh token
    await setSignedCookie(
      c,
      "refresh_token",
      refreshToken,
      env.COOKIE_SECRET,
      cookieConfig(24 * 7, 7)
    );

    return c.json({
      message: "success",
      data: { message: "Login Successful" },
    });
  } else {
    return c.text("Invalid password", 401);
  }
}

export async function signUp(
  c: Context<
    {},
    "/sign-up",
    {
      in: {
        form: {
          userName: ParsedFormValue | ParsedFormValue[];
          password: ParsedFormValue | ParsedFormValue[];
          firstName: ParsedFormValue | ParsedFormValue[];
          lastName: ParsedFormValue | ParsedFormValue[];
          bio: ParsedFormValue | ParsedFormValue[];
          email: ParsedFormValue | ParsedFormValue[];
        };
      };
      out: {
        form: {
          userName: ParsedFormValue | ParsedFormValue[];
          password: ParsedFormValue | ParsedFormValue[];
          firstName: ParsedFormValue | ParsedFormValue[];
          lastName: ParsedFormValue | ParsedFormValue[];
          bio: ParsedFormValue | ParsedFormValue[];
          email: ParsedFormValue | ParsedFormValue[];
        };
      };
    }
  >
) {
  const { userName, password, firstName, lastName, bio, email } =
    c.req.valid("form");
  console.log("data -> ", userName, password, firstName, lastName);

  const user = await db.query.users.findFirst({
    where: eq(users.userName, userName as string),
  });
  if (user) {
    return c.text("User already exists", 400);
  }

  // use bycrpt to encrypt the password
  const hashedPassword = hashPassword(password as string);

  const userInsertion = await db.insert(users).values({
    userName: userName as string,
    password: hashedPassword,
    firstName: firstName as string,
    lastName: lastName as string,
    bio: bio as string,
    email: email as string,
  });

  if (!userInsertion) return c.text("User not created", 400);

  return c.json({ message: "success", data: userInsertion });
}

export async function logout(c: Context) {
  deleteCookie(c, "login_token");
  deleteCookie(c, "refresh_token");
  return c.json({ message: "success", data: "Logout Successful" });
}
