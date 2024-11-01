import { Job } from "../models/jobModel.js";

export const postjob = async (req, res) => {
  try {
    let {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      positions,
      companyId,
    } = req.body;
    let userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !positions ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    let job = await Job.create({
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      positions,
      company: companyId,
      created_by: userId,
    });

    return res.status(200).json({
      message: "New Job Created Successfully",
      job,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getAllJobs = async (req, res) => {
  try {
    let keyword = req.query.keyword || "";
    let query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    let jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .populate({
        path: "created_by",
      })
      .sort({ createdAt: -1 });

    if (jobs.length > 0) {
      return res.status(200).json({
        jobs,
        success: true,
      });
    }

    return res.status(404).json({
      message: "No Job Found",
      success: false,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "An error occurred",
      success: false,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    let jobId = req.params.id;
    let job = await Job.findById(jobId).populate("applications");
    if (!job) {
      return res.status(404).json({
        message: "No Job found",
        success: "false",
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

export const getAdminJobs = async (req, res) => {
  try {
    let adminId = req.id;
    let jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });
    if (!jobs) {
      return res.status(404).json({
        message: "No job Posted by you",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};
