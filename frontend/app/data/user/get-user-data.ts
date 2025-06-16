import { db } from "@/src/db";
import { eq } from "drizzle-orm";
import {
  contactDetails,
  users,
  projects,
  stackGroups,
  stackItems,
  userAbout,
  blogs,
} from "@/src/db/schema";

export async function getUserData(username: string) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.userName, username),
      columns: {
        firstName: true,
        lastName: true,
        bio: true,
        designation: true,
        email: true,
        id: true,
      },
    });

    if (!user) {
      return null;
    }

    const contactDetailsData = await db.query.contactDetails.findMany({
      where: eq(contactDetails.userId, user?.id),
      columns: {
        link: true,
        linkType: true,
      },
    });

    const projectsData = await db.query.projects.findMany({
      where: eq(projects.userId, user?.id),
      columns: {
        title: true,
        description: true,
        imageLink: true,
        demoLink: true,
        codeLink: true,
        tags: true,
      },
    });

    const userAboutData = await db.query.userAbout.findFirst({
      where: eq(userAbout.userId, user?.id),
      columns: {
        shortDescription: true,
        description: true,
        imageLink: true,
        email: true,
        phoneNumber: true,
        location: true,
      },
    });

    const blogsData = await db.query.blogs.findMany({
      where: eq(blogs.userId, user?.id),
      columns: {
        title: true,
        description: true,
        blogText: true,
        estimateReadTime: true,
        tag: true,
        createdTime: true,
      },
    });

    const result = await db
      .select({
        stackGroupName: stackGroups.name,
        stackItemName: stackItems.name,
        stackItemIcon: stackItems.imageLink,
        stackGroupId: stackGroups.id,
      })
      .from(stackGroups)
      .leftJoin(stackItems, eq(stackGroups.id, stackItems.stackGroupId));

    const grouped = result.reduce((acc, row) => {
      const existing = acc.find((g) => g.stackGroupName === row.stackGroupName);
      const item = {
        name: row.stackItemName ?? "",
        icon: row.stackItemIcon ?? "",
      };

      if (existing) {
        existing.stackItems.push(item);
      } else {
        acc.push({
          stackGroupName: row.stackGroupName,
          stackItems: [item],
        });
      }

      return acc;
    }, [] as { stackGroupName: string; stackItems: { name: string; icon: string }[] }[]);

    const mainUser: Omit<typeof user, "id"> = {
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio,
      designation: user.designation,
      email: user.email,
    };
    return {
      user: mainUser,
      contactDetails: contactDetailsData,
      projects: projectsData,
      userAbout: userAboutData,
      blogs: blogsData,
      stackGroups: grouped,
    };
  } catch (error) {
    return null;
  }
}
