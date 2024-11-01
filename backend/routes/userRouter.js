import express from "express";

import {
  signUp,
  logIn,
  updateProfile,
  logOut,
} from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.route("/signup").post(singleUpload, signUp);
userRouter.route("/login").post(logIn);
userRouter.route("/logout").get(logOut);
userRouter
  .route("/update/profile")
  .post(isAuthenticated, singleUpload, updateProfile);

export default userRouter;
