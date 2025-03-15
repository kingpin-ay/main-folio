import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
// import { serve } from "@hono/node-server";
import { cors } from "hono/cors";

const app = new Hono();

app.use("*", cors());

app.get("/", (c) => {
  return c.text(`Hello hono! ${c.req.path}`, 200);
});

app.get("/*", (c) => {
  return c.text(`Hello from any path! ${c.req.path}`, 200);
});

// serve(
//   {
//     fetch: app.fetch,
//     port: 3000,
//   },
//   (info) => {
//     console.log(`Server is running on http://localhost:${info.port}`);
//   }
// );

export const handler = handle(app);
