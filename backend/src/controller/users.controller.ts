// user.ts
import { Hono } from "hono";
import { authMiddleware } from "../middlewares/auth.middleware";

const app = new Hono();

app.use(authMiddleware);

app.post("/verify", async (c) => {
  return c.json({
    message: "Authorized",
  });
});

export default app;
