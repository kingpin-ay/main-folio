import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { UserPayload } from "../../lib/types/user.type.controller";

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
