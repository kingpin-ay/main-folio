import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { UserPayload } from "../../lib/types/user.type.controller";
import { profileTabValidatorSchema } from "../../lib/validation-schema/user.schema";
import { z } from "zod";

export type UserProfile = z.infer<typeof profileTabValidatorSchema>;

export async function getUserDashboard(userPayload: UserPayload) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userPayload.id),
    columns: {
      designation: true,
      userName: true,
      firstName: true,
      lastName: true,
      bio: true,
      email: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function updateUserProfile(
  userPayload: UserPayload,
  body: UserProfile
) {
  try {
    const user = await db
      .update(users)
      .set(body)
      .where(eq(users.id, userPayload.id));

    return user;
  } catch (error) {
    throw new Error("User not found");
  }
}
