import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/applicationController.js";

const applicationRouter = express.Router();

applicationRouter.route("/apply/:id").post(isAuthenticated, applyJob);
applicationRouter.route("/get").get(isAuthenticated, getAppliedJobs);
applicationRouter.route("/:id/applicants").get(isAuthenticated, getApplicants);
applicationRouter
  .route("/status/:id/update")
  .put(isAuthenticated, updateStatus);

export default applicationRouter;
