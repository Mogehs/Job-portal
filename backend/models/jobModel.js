import mongoose from "mongoose";

let jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      rquired: true,
    },
    description: {
      type: String,
      rquired: true,
    },

    salary: {
      type: String,
      rquired: true,
    },
    positions: {
      type: String,
      rquired: true,
    },
    location: {
      type: String,
      rquired: true,
    },
    requirements: {
      type: String,
      rquired: true,
    },
    jobType: {
      type: String,
      rquired: true,
    },
    experience: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
