import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

const app = new Hono();
const header = {
  "Access-Control-Allow-Origin": "https://main.d3s09nbx3p1m4t.amplifyapp.com",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
};

app.get("/", (c) => {
  return c.text("Hello hono!", 200, header);
});

export const handler = handle(app);
