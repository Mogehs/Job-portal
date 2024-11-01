import mongoose from "mongoose";

let userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "recruiter"],
      required: true,
    },

    profile: {
      bio: { type: String, trim: true, default: "" },
      skills: [{ type: String, trim: true }],
      resume: { type: String, default: "" },
      resumeOriginalName: { type: String, trim: true, default: "" },
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        default: null,
      },
      profilePhoto: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
