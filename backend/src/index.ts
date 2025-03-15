import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { cors } from "hono/cors";

const app = new Hono().basePath("/default");

app.use(
  "https://main.d3s09nbx3p1m4t.amplifyapp.com",
  cors()
);

app.get("/", (c) => {
  return c.text(`Hello hono! ${c.req.path}`, 200);
});
app.get("/*", (c) => {
  return c.text(`Hello hono! ${c.req.path}`, 200);
});

export const handler = handle(app);
