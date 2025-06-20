import { db } from "../db/index.js";
import {
  contactDetails,
  projects,
  stackGroups,
  stackItems,
  userAbout,
  users,
  blogs,
} from "../db/schema.js";
import { and, eq, inArray } from "drizzle-orm";
import type { UserPayload } from "../lib/types/user.type.controller.js";
import {
  profileTabValidatorSchema,
  aboutTabValidatorSchema,
  contactTabValidatorSchema,
} from "../lib/validation-schema/user.schema.js";
import { z } from "zod";

export type UserProfile = z.infer<typeof profileTabValidatorSchema>;
export type UserAbout = z.infer<typeof aboutTabValidatorSchema>;
export type ContactDetails = z.infer<typeof contactTabValidatorSchema>;
export type Blogs = {
  id: number;
  title: string;
  description: string;
  blogText: string;
  estimateReadTime: number;
  tag: string;
  createdTime: string;
};

export type Projects = {
  id: number;
  title: string;
  description: string;
  imageLink: string;
  demoLink: string;
  codeLink: string;
  tags: string[];
};

export interface StackItem {
  name: string;
  image_link: string;
}

export interface StackGroup {
  id: number;
  name: string;
  description: string;
  items: StackItem[];
}

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
      id: true,
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
  const stackGroupIds = stackGroupsData.map((group: { id: any }) => group.id);

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
      tags: true,
    },
  });

  const blogsData = await db.query.blogs.findMany({
    where: eq(blogs.userId, userPayload.id),
    columns: {
      id: true,
      title: true,
      description: true,
      blogText: true,
      estimateReadTime: true,
      tag: true,
      createdTime: true,
    },
  });

  // Arrange stackGroups with their items (fix description type)
  const stackGroupsMain: StackGroup[] = stackGroupsData.map(
    (group: { id: any; name: any; description: any }) => ({
      id: group.id,
      name: group.name,
      description: group.description ?? "",
      items: stackItemsData
        .filter((item: { stackGroupId: any }) => item.stackGroupId === group.id)
        .map((item: { id: any; name: any; imageLink: any }) => ({
          id: item.id,
          name: item.name,
          image_link: item.imageLink,
        })),
    })
  );

  return {
    user: user,
    userAbout: userAboutData,
    contactDetails: contactDetailsData,
    stackGroups: stackGroupsMain,
    projects: projectsData,
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

export async function updateUserContacts(
  userPayload: UserPayload,
  body: ContactDetails
) {
  try {
    const newContacts = body.contacts.map((contact) => ({
      ...contact,
      userId: userPayload.id,
      linkType: contact.linkType as
        | "GITHUB"
        | "YOUTUBE"
        | "X"
        | "MAIL"
        | "LINKEDLN",
    }));
    const tobeInsertedContacts = newContacts
      .filter(
        (contact): contact is typeof contact & { id: number } =>
          typeof contact.id === "number" && contact.id === 0
      )
      .map((contact) => ({
        link: contact.link,
        userId: userPayload.id,
        linkType: contact.linkType as
          | "GITHUB"
          | "YOUTUBE"
          | "X"
          | "MAIL"
          | "LINKEDLN",
      }));
    const tobeUpdatedContacts = newContacts.filter(
      (contact): contact is typeof contact & { id: number } =>
        typeof contact.id === "number" && contact.id !== 0
    );
    // create new rows in the contactDetails table
    let newUserContacts;
    if (tobeInsertedContacts.length > 0) {
      newUserContacts = await db
        .insert(contactDetails)
        .values(tobeInsertedContacts);
    }
    // update the existing rows in the contactDetails table
    if (tobeUpdatedContacts.length > 0) {
      for (const contact of tobeUpdatedContacts) {
        await db
          .update(contactDetails)
          .set({ link: contact.link, linkType: contact.linkType })
          .where(eq(contactDetails.id, contact.id as number));
      }
    }
    return newUserContacts;
  } catch (error) {
    console.log(error);
    throw new Error("User not found");
  }
}

export async function deleteUserContact(id: number) {
  try {
    const userContact = await db
      .delete(contactDetails)
      .where(eq(contactDetails.id, id));
    return userContact;
  } catch (error) {
    throw new Error("User not found");
  }
}

export async function updateUserStackGroups(
  userPayload: UserPayload,
  body: StackGroup[]
) {
  try {
    const stackGroups_main = body.map((group) => ({
      ...group,
      userId: userPayload.id,
    }));
    const tobeInsertedStackGroups = stackGroups_main
      .filter(
        (group): group is typeof group & { id: number } =>
          typeof group.id === "number" && group.id === 0
      )
      .map(({ id, ...rest }) => rest);

    // if (tobeInsertedStackGroups.length > 0) {
    //   await db.insert(stackGroups).values(tobeInsertedStackGroups);
    // }

    for (const group of tobeInsertedStackGroups) {
      const newAddedStackGroup = await db
        .insert(stackGroups)
        .values({
          name: group.name,
          description: group.description,
          userId: userPayload.id,
        })
        .returning({ id: stackGroups.id });

      for (const item of group.items) {
        await db.insert(stackItems).values({
          name: item.name,
          imageLink: item.image_link,
          stackGroupId: newAddedStackGroup[0].id,
        });
      }
    }

    return stackGroups_main;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
}

export async function deleteSingleStackGroupItem(
  stackGroupId: number,
  stackItemId: number
) {
  try {
    const stackItem = await db
      .delete(stackItems)
      .where(
        and(
          eq(stackItems.id, stackItemId),
          eq(stackItems.stackGroupId, stackGroupId)
        )
      );
    return stackItem;
  } catch (error) {
    throw new Error("User not found");
  }
}

export async function addStackGroupItem(
  stackGroupId: number,
  stackItem: StackItem
) {
  try {
    const newStackItem = await db.insert(stackItems).values({
      name: stackItem.name,
      imageLink: stackItem.image_link,
      stackGroupId: stackGroupId,
    });
    return newStackItem;
  } catch (error) {
    throw new Error("User not found");
  }
}

export async function deleteStackGroup(stackGroupId: number) {
  try {
    const stackGroupItemsDelete = await db
      .delete(stackItems)
      .where(eq(stackItems.stackGroupId, stackGroupId));
    const stackGroup = await db
      .delete(stackGroups)
      .where(eq(stackGroups.id, stackGroupId));
    return stackGroup;
  } catch (error) {
    console.log(error);
    throw new Error("User not found");
  }
}

export async function updateUserProjects(
  userPayload: UserPayload,
  body: Projects[]
) {
  try {
    const projects_main = body.map((project) => ({
      ...project,
      userId: userPayload.id,
    }));
    const tobeInsertedProjects = projects_main.filter(
      (project): project is typeof project & { id: number } =>
        typeof project.id === "number" && project.id === 0
    );

    const project_data = tobeInsertedProjects.map((project) => ({
      title: project.title,
      description: project.description,
      imageLink: project.imageLink,
      demoLink: project.demoLink,
      codeLink: project.codeLink,
      tags: project.tags,
      userId: userPayload.id,
    }));

    if (project_data.length > 0) {
      await db.insert(projects).values(project_data);
    }

    return projects;
  } catch (error) {
    throw new Error("User not found");
  }
}

export async function deleteProject(id: number) {
  try {
    const project = await db.delete(projects).where(eq(projects.id, id));
    return project;
  } catch (error) {
    throw new Error("User not found");
  }
}

export async function updateUserBlogs(userPayload: UserPayload, body: Blogs[]) {
  try {
    const blogs_main = body.map((blog) => ({
      ...blog,
      userId: userPayload.id,
      estimateReadTime: blog.estimateReadTime.toString(),
    }));

    const tobeInsertedBlogs = blogs_main
      .filter(
        (blog): blog is typeof blog & { id: number } =>
          typeof blog.id === "number" && blog.id === 0
      )
      .map(({ id, createdTime, ...rest }) => rest);

    const added_blogs = await db.insert(blogs).values(tobeInsertedBlogs);
    return added_blogs;
  } catch (error) {
    console.log(error);
    throw new Error("User not found");
  }
}

export async function deleteBlog(id: number) {
  try {
    const blog = await db.delete(blogs).where(eq(blogs.id, id));
    return blog;
  } catch (error) {
    throw new Error("User not found");
  }
}

export async function getUserProfileData(username: string) {
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
