import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { cors } from "hono/cors";

const app = new Hono().basePath("/default");

app.use(
  "*",
  cors({
    origin: "https://main.d3s09nbx3p1m4t.amplifyapp.com",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    credentials: true,
    maxAge: 86400,
  })
);

app.get("/", (c) => {
  return c.text(`Hello hono! ${c.req.path}`, 200);
});

export const handler = handle(app);
