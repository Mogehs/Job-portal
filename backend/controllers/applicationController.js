import { Application } from "../models/applicationModel.js";
import { Job } from "../models/jobModel.js";

export const applyJob = async (req, res) => {
  try {
    let jobId = req.params.id;
    let userId = req.id;

    if (!jobId) {
      return res.status(401).json({
        message: "No Job Found",
        success: false,
      });
    }

    let existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job ",
        success: false,
      });
    }

    let job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "No Job Found",
        success: false,
      });
    }

    let newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication);

    await job.save();
    return res.status(200).json({
      message: "Application sent successfully",
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    let userId = req.id;
    let application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: { path: "company" },
        options: { sort: { createdAt: -1 } },
      });

    if (!application) {
      return res.status(401).json({
        message: "No Application Found",
        success: false,
      });
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (e) {
    console.log(e.message);
  }
};

export const getApplicants = async (req, res) => {
  try {
    let jobId = req.params.id;
    let job = await Job.findById(jobId).populate({
      path: "applications",
      populate: {
        path: "applicant",
      },
      options: { sort: { createdAt: -1 } },
    });
    if (!job) {
      return res.status(404).json({
        message: "No Job found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export const updateStatus = async (req, res) => {
  try {
    let { status } = req.body;
    let applicationId = req.params.id;

    if (!status) {
      return res.status(404).json({
        message: "Status is required",
        success: false,
      });
    }

    let application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "No applicant found for this job",
        success: false,
      });
    }

    application.status = status.toLowerCase();

    await application.save();

    return res.status(200).json({
      message: "Status updated succesfully ",
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};
