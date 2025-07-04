// user.ts
import { Hono } from "hono";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import type { Variables } from "../lib/types/user.type.controller.js";
import {
  addStackGroupItem,
  deleteSingleStackGroupItem,
  deleteStackGroup,
  deleteUserContact,
  getUserDashboard,
  updateUserAbout,
  updateUserProjects,
  updateUserContacts,
  updateUserProfile,
  updateUserStackGroups,
  deleteProject,
  updateUserBlogs,
  deleteBlog,
} from "../service/user.service.js";
import { validator } from "hono/validator";
import {
  aboutTabValidator,
  contactTabValidator,
  profileTabValidator,
  projectsValidator,
  stackGroupValidator,
  stackItemValidator,
  blogsValidator,
} from "../lib/validator/dashboard.validator.js";

const app = new Hono<{ Variables: Variables }>();

app.use(authMiddleware);

app.post("/verify", async (c) => {
  return c.json({
    data: c.get("user"),
    status: 200,
    message: "Authorized",
  });
});

app.get("/get/user/dashboard", async (c) => {
  const userPayload = c.get("user");
  const user = await getUserDashboard(userPayload);
  return c.json({
    data: user,
    status: 200,
    message: "Authorized",
  });
});

app.post(
  "/post/user/dashboard/profile",
  validator("json", profileTabValidator),
  async (c) => {
    const body = c.req.valid("json");
    const userPayload = c.get("user");
    const user = await updateUserProfile(userPayload, body);

    return c.json({
      data: user,
      status: 200,
      message: "Profile updated successfully",
    });
  }
);

app.post(
  "/post/user/dashboard/about",
  validator("json", aboutTabValidator),
  async (c) => {
    const body = c.req.valid("json");
    const userPayload = c.get("user");

    const user = await updateUserAbout(userPayload, body);

    return c.json({
      data: user,
      status: 200,
      message: "About updated successfully",
    });
  }
);

app.post(
  "/post/user/dashboard/contacts",
  validator("json", contactTabValidator),
  async (c) => {
    const body = c.req.valid("json");
    const userPayload = c.get("user");

    const user = await updateUserContacts(userPayload, body);

    return c.json({
      data: user,
      status: 200,
      message: "Contacts updated successfully",
    });
  }
);

app.delete("/delete/user/dashboard/contacts/:id", async (c) => {
  const id = c.req.param("id");
  const user = await deleteUserContact(Number(id));
  return c.json({
    data: user,
    status: 200,
    message: "Contact deleted successfully",
  });
});

app.post(
  "/post/user/dashboard/stack-groups",
  validator("json", stackGroupValidator),
  async (c) => {
    const body = c.req.valid("json");
    const userPayload = c.get("user");

    const user = await updateUserStackGroups(userPayload, body.stackGroups);

    return c.json({
      data: user,
      status: 200,
      message: "Stack groups updated successfully",
    });
  }
);

app.delete(
  "/delete/user/dashboard/stack-groups/:stackGroupId/items/:stackItemId",
  async (c) => {
    const stackGroupId = c.req.param("stackGroupId");
    const stackItemId = c.req.param("stackItemId");
    const user = await deleteSingleStackGroupItem(
      Number(stackGroupId),
      Number(stackItemId)
    );
    return c.json({
      data: user,
    });
  }
);

app.post(
  "/post/user/dashboard/stack-groups/:stackGroupId/items",
  validator("json", stackItemValidator),
  async (c) => {
    const stackGroupId = c.req.param("stackGroupId");
    const body = c.req.valid("json");

    const user = await addStackGroupItem(Number(stackGroupId), body.stackItem);
    return c.json({
      data: user,
    });
  }
);

app.delete("/delete/user/dashboard/stack-groups/:stackGroupId", async (c) => {
  const stackGroupId = c.req.param("stackGroupId");
  const user = await deleteStackGroup(Number(stackGroupId));
  return c.json({
    data: user,
  });
});

app.post(
  "/post/user/dashboard/projects",
  validator("json", projectsValidator),
  async (c) => {
    const body = c.req.valid("json");
    const userPayload = c.get("user");
    const user = await updateUserProjects(userPayload, body.projects);
    return c.json({
      data: {},
      status: 200,
      message: "Projects updated successfully",
    });
  }
);

app.delete("/delete/user/dashboard/projects/:id", async (c) => {
  const id = c.req.param("id");
  const user = await deleteProject(Number(id));
  return c.json({
    data: user,
    status: 200,
    message: "Project deleted successfully",
  });
});

app.post(
  "/post/user/dashboard/blogs",
  validator("json", blogsValidator),
  async (c) => {
    const body = c.req.valid("json");
    const userPayload = c.get("user");
    const user = await updateUserBlogs(userPayload, body.blogs);
    return c.json({
      data: user,
      status: 200,
      message: "Blogs updated successfully",
    });
  }
);

app.delete("/delete/user/dashboard/blogs/:id", async (c) => {
  const id = c.req.param("id");
  const user = await deleteBlog(Number(id));
  return c.json({
    data: user,
  });
});

export default app;
