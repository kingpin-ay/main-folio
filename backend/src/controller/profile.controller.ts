import { Hono } from "hono";
import type { Variables } from "../lib/types/user.type.controller.js";
import { getUserProfileData } from "../service/user.service.js";

const app = new Hono<{ Variables: Variables }>();

app.get("/get/user/data/:username", async (c) => {
  const username = c.req.param("username");
  const user = await getUserProfileData(username);
  return c.json({
    data: user,
    status: 200,
    message: "User data fetched successfully",
  });
});

export default app;
