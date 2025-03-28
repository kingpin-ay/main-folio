// auth controller
import { Hono } from "hono";

import { login, signUp } from "../service/auth.service";
import { validator } from "hono/validator";
import {
  loginValidator,
  signUpValidator,
} from "../../lib/validator/auth.validator";

const app = new Hono()
  .post("/login", validator("form", loginValidator), login)
  .post("/sign-up", validator("form", signUpValidator), signUp)
  .get("/:id", (c) => c.json(`get ${c.req.param("id")}`));

export default app;
