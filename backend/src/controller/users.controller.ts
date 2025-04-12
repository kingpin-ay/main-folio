// user.ts
import { Hono } from "hono";
import { authMiddleware } from "../middlewares/auth.middleware";
import { Variables } from "../../lib/types/user.type.controller";
import { getUserDashboard } from "../service/user.service";

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

export default app;
