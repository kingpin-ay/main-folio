import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { cors } from "hono/cors";

const app = new Hono().basePath("/default");

app.use("*", cors());

app.get("/", (c) => {
  return c.text(`Hello hono! ${c.req.path}`, 200);
});

app.get("/*", (c) => {
  return c.text(`Hello hono starting point! ${c.req.path}`, 200);
});

export const handler = handle(app);
