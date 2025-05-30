import { db } from "../db";
import { userAbout, users } from "../db/schema";
import { eq } from "drizzle-orm";
import { UserPayload } from "../../lib/types/user.type.controller";
import {
  profileTabValidatorSchema,
  aboutTabValidatorSchema,
} from "../../lib/validation-schema/user.schema";
import { z } from "zod";

export type UserProfile = z.infer<typeof profileTabValidatorSchema>;
export type UserAbout = z.infer<typeof aboutTabValidatorSchema>;

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

  const userAboutData = await db.query.userAbout.findFirst({
    where: eq(userAbout.userId, userPayload.id),
    columns: {
      shortDescription: true,
      description: true,
      imageLink: true,
      email: true,
      phoneNumber: true,
      location: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return { user: user, userAbout: userAboutData };
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

export async function updateUserAbout(
  userPayload: UserPayload,
  body: UserAbout
) {
  try {
    const foundedUserAboutData = await db.query.userAbout.findFirst({
      where: eq(userAbout.userId, userPayload.id),
    });

    if (!foundedUserAboutData) {
      const userAboutData = await db.insert(userAbout).values({
        userId: userPayload.id,
        shortDescription: body.shortDescription,
        description: body.description,
        imageLink: body.imageLink,
        email: body.email,
        phoneNumber: body.phoneNumber,
        location: body.location,
      });
      return userAboutData;
    } else {
      const userAboutData = await db
        .update(userAbout)
        .set({ ...body, userId: userPayload.id })
        .where(eq(userAbout.userId, userPayload.id));
      return userAboutData;
    }
  } catch (error) {
    throw new Error("User not found");
  }
}
