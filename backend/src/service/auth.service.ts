import { Context } from "hono";
import { ParsedFormValue } from "hono/types";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { users } from "../db/schema";
import { hashPassword, matchPassword } from "../../lib/helper/security";
import { sign } from "hono/jwt";
import { env } from "../../lib/helper/env";
import { deleteCookie, setSignedCookie } from "hono/cookie";

export async function login(
  c: Context<
    {},
    "/login",
    {
      in: {
        form: {
          userName: ParsedFormValue | ParsedFormValue[];
          password: ParsedFormValue | ParsedFormValue[];
        };
      };
      out: {
        form: {
          userName: ParsedFormValue | ParsedFormValue[];
          password: ParsedFormValue | ParsedFormValue[];
        };
      };
    }
  >
) {
  const { userName, password } = c.req.valid("form");

  const user = await db.query.users.findFirst({
    columns: {
      id: true,
      userName: true,
      password: true,
    },
    where: eq(users.userName, userName as string),
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
    await setSignedCookie(c, "login_token", token, env.COOKIE_SECRET, {
      path: "/",
      secure: true,
      // domain: 'example.com',
      httpOnly: true,
      maxAge: 1000,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      sameSite: "Strict",
    });

    // set signed token for the refresh token
    await setSignedCookie(c, "refresh_token", refreshToken, env.COOKIE_SECRET, {
      path: "/",
      secure: true,
      // domain: 'example.com',
      httpOnly: true,
      maxAge: 1000,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      sameSite: "Strict",
    });

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
        };
      };
      out: {
        form: {
          userName: ParsedFormValue | ParsedFormValue[];
          password: ParsedFormValue | ParsedFormValue[];
          firstName: ParsedFormValue | ParsedFormValue[];
          lastName: ParsedFormValue | ParsedFormValue[];
          bio: ParsedFormValue | ParsedFormValue[];
        };
      };
    }
  >
) {
  const { userName, password, firstName, lastName, bio } = c.req.valid("form");
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
  });

  if (!userInsertion) return c.text("User not created", 400);

  return c.json({ message: "success", data: userInsertion });
}

export async function logout(c: Context) {
  deleteCookie(c, "login_token");
  deleteCookie(c, "refresh_token");
  return c.json({ message: "success", data: "Logout Successful" });
}
