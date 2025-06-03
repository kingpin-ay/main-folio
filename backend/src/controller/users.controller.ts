// user.ts
import { Hono } from "hono";
import { authMiddleware } from "../middlewares/auth.middleware";
import { Variables } from "../../lib/types/user.type.controller";
import {
  getUserDashboard,
  updateUserAbout,
  updateUserContacts,
  updateUserProfile,
} from "../service/user.service";
import { validator } from "hono/validator";
import {
  aboutTabValidator,
  contactTabValidator,
  profileTabValidator,
} from "../../lib/validator/dashboard.validator";

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

export default app;
