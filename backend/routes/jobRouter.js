import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postjob,
} from "../controllers/jobController.js";

const jobRouter = express.Router();

jobRouter.route("/post").post(isAuthenticated, postjob);
jobRouter.route("/get").get(getAllJobs);
jobRouter.route("/get/adminjobs").get(isAuthenticated, getAdminJobs);
jobRouter.route("/get/:id").get(isAuthenticated, getJobById);

export default jobRouter;
