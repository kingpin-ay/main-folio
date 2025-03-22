import { Hono } from "hono";
import { handle, LambdaEvent } from "hono/aws-lambda";
import { cors } from "hono/cors";

type Bindings = {
  event: LambdaEvent;
};

const app = new Hono<{ Bindings: Bindings }>().basePath("/default");

app.use("*", cors());

app.get("/", (c) => {
  return c.text(`Hello hono! ${c.req.path}`, 200);
});

app.get("/update", (c) => {
  return c.text(`Hello hono starting point! ${c.req.path}`, 200);
});

export const handler = handle(app);
