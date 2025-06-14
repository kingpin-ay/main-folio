import { pgTable, bigint, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  bio: text("bio").notNull(),
  designation: text("designation"),
  userName: text("user_name").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
});

export const projects = pgTable("project", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageLink: text("image_link"),
  demoLink: text("demo_link"),
  codeLink: text("code_link"),
  userId: bigint("user_id", { mode: "number" })
    .notNull()
    .references(() => users.id),
  tags: text("tags").array(),
});

export const blogs = pgTable("blog", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  blogText: text("blog_text").notNull(),
  createdTime: timestamp("created_time", { withTimezone: true }).notNull(),
  estimateReadTime: text("estimate_read_time"),
  tag: text("tag"),
  userId: bigint("user_id", { mode: "number" })
    .notNull()
    .references(() => users.id),
});

export const userAbout = pgTable("user_about", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  shortDescription: text("short_description"),
  description: text("description").notNull(),
  imageLink: text("image_link").notNull(),
  userId: bigint("user_id", { mode: "number" })
    .notNull()
    .references(() => users.id),
  email: text("email"),
  phoneNumber: text("phone_number"),
  location: text("location"),
});

export const stackGroups = pgTable("stack_group", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  description: text("description"),
  userId: bigint("user_id", { mode: "number" })
    .notNull()
    .references(() => users.id),
});

export const stackItems = pgTable("stack_item", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  stackGroupId: bigint("stack_group_id", { mode: "number" })
    .notNull()
    .references(() => stackGroups.id),
  name: text("name").notNull(),
  imageLink: text("image_link").notNull(),
});

export const contactDetails = pgTable("contact_details", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  userId: bigint("user_id", { mode: "number" })
    .notNull()
    .references(() => users.id),
  link: text("link").notNull(),
  linkType: varchar("link_type", { length: 255 })
    .notNull()
    .$type<"GITHUB" | "YOUTUBE" | "X" | "MAIL" | "LINKEDLN">(),
});
