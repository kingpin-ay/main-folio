// auth controller
import { Hono } from "hono";
import { login, logout, signUp } from "../service/auth.service.js";
import { validator } from "hono/validator";
import {
  loginValidator,
  signUpValidator,
} from "../lib/validator/auth.validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const app = new Hono()
  .post("/login", validator("form", loginValidator), login)
  .post("/sign-up", validator("form", signUpValidator), signUp)
  .get("/logout", authMiddleware, logout);

export default app;
