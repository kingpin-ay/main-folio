import { Context } from "hono";
import { ParsedFormValue } from "hono/types";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { users } from "../db/schema";
import { hashPassword, matchPassword } from "../../lib/helper/security";

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
    return c.json({ message: "success", data: { ...user } });
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
