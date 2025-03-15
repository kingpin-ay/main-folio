import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { cors } from "hono/cors";

const app = new Hono();

app.use("*", cors());

app.get("/", (c) => {
  return c.text("Hello hono!", 200);
});

app.get("/*", (c) => {
  return c.text("Hello from any path!", 200);
});

export const handler = handle(app);
