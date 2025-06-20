import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import users from "./controller/users.controller.js";
import auth from "./controller/auth.controller.js";
import profile from "./controller/profile.controller.js";
import { env } from "./lib/helper/env.js";

const app = new Hono().basePath("/default");

app.use(
  "*",
  cors({
    origin: env.FRONTEND_URL || "localhost",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(logger());
app.get("/health-check", (c) => {
  return c.text(
    `Hello hono starting point! ${c.req.path} - Health-check succesfull`,
    200
  );
});

app.route("/auth", auth);
app.route("/users", users);

app.route("/profile", profile);
serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info: { port: any }) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
