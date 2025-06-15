import { Hono } from "hono";
import { Variables } from "hono/types";
import { getUserProfileData } from "../service/user.service";

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
