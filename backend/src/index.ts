import { Hono } from "hono";
import { handle, LambdaEvent } from "hono/aws-lambda";
import { cors } from "hono/cors";
// import { serve } from "@hono/node-server";

type Bindings = {
  event: LambdaEvent;
};

const app = new Hono<{ Bindings: Bindings }>().basePath("/default");

app.use("*", cors());

app.get("/health-check", (c) => {
  return c.text(
    `Hello hono starting point! ${c.req.path} - Health-check succesfull`,
    200
  );
});

// serve({ port: 3001, fetch: app.fetch });

export const handler = handle(app);
