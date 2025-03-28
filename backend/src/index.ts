import { Hono } from "hono";
import { handle, LambdaEvent } from "hono/aws-lambda";
import { cors } from "hono/cors";
// import { serve } from "@hono/node-server";
import users from "./controller/users.controller";
import auth from "./controller/auth.controller";
import { logger } from "hono/logger";
import { env } from "../lib/helper/env";

type Bindings = {
  event: LambdaEvent;
};

const app = new Hono<{ Bindings: Bindings }>().basePath("/default");

app.use(
  "*",
  cors({
    origin: env.FRONTEND_URL,
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

// serve({ port: 3001, fetch: app.fetch });

export const handler = handle(app);
