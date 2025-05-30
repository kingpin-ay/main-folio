import { db } from "../db";
import {
  contactDetails,
  projects,
  projectTags,
  stackGroups,
  stackItems,
  userAbout,
  users,
  blogs,
} from "../db/schema";
import { eq, inArray } from "drizzle-orm";
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

  if (!user) {
    throw new Error("User not found");
  }

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

  const contactDetailsData = await db.query.contactDetails.findMany({
    where: eq(contactDetails.userId, userPayload.id),
    columns: {
      link: true,
      linkType: true,
    },
  });

  const stackGroupsData = await db.query.stackGroups.findMany({
    where: eq(stackGroups.userId, userPayload.id),
    columns: {
      id: true,
      name: true,
      description: true,
    },
  });
  const stackGroupIds = stackGroupsData.map((group) => group.id);

  const stackItemsData = await db.query.stackItems.findMany({
    where: inArray(stackItems.stackGroupId, stackGroupIds),
    columns: {
      id: true,
      stackGroupId: true,
      name: true,
      imageLink: true,
    },
  });

  const projectsData = await db.query.projects.findMany({
    where: eq(projects.userId, userPayload.id),
    columns: {
      id: true,
      title: true,
      description: true,
      imageLink: true,
      demoLink: true,
      codeLink: true,
    },
  });

  const projectTagsData = await db.query.projectTags.findMany({
    where: inArray(
      projectTags.projectId,
      projectsData.map((project) => project.id)
    ),
    columns: {
      id: true,
      projectId: true,
      title: true,
    },
  });

  const blogsData = await db.query.blogs.findMany({
    where: eq(blogs.userId, userPayload.id),
    columns: {
      id: true,
      title: true,
      description: true,
      blogText: true,
    },
  });

  return {
    user: user,
    userAbout: userAboutData,
    contactDetails: contactDetailsData,
    stackItems: stackItemsData,
    stackGroups: stackGroupsData,
    projects: projectsData,
    projectTags: projectTagsData,
    blogs: blogsData,
  };
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
