// authors.ts
import { Hono } from "hono";

const app = new Hono().get("/:id", (c) => c.json(`get ${c.req.param("id")}`));

export default app;
