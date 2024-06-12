import { Router } from "express";
import {
  logInUser,
  logOutUser,
  signUpUser,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/signup", signUpUser);
authRouter.post("/login", logInUser);
authRouter.post("/logout", logOutUser);

export default authRouter;
