import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello hono!");
});
app.get("/health", (c) => {
  return c.text("ok");
});

export const handler = handle(app);
