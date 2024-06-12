import { Router } from "express";
import {
  deleteProfile,
  getProfile,
  postProfile,
  updateProfile,
} from "../controllers/profile.controller.js";

const profileRouter = Router();

profileRouter.post("/:username", postProfile);
profileRouter.get("/:username", getProfile);
profileRouter.put("/:username", updateProfile);
profileRouter.delete("/:username", deleteProfile);

export default profileRouter;
