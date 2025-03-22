import { Hono } from "hono";
import { handle, LambdaEvent } from "hono/aws-lambda";
import { cors } from "hono/cors";
// import { serve } from "@hono/node-server";

type Bindings = {
  event: LambdaEvent;
};

const app = new Hono<{ Bindings: Bindings }>().basePath("/default");

app.use("https://main.d3s09nbx3p1m4t.amplifyapp.com/", cors());

app.get("/", (c) => {
  return c.text(`Hello hono! ${c.req.path}`, 200);
});

app.get("/update", (c) => {
  return c.text(`Hello hono starting point! ${c.req.path}`, 200);
});

// serve({ port: 3001, fetch: app.fetch });

export const handler = handle(app);
