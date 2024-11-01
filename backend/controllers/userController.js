import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const signUp = async (req, res) => {
  let file = req.file;
  try {
    let { email, fullName, password, phoneNumber, role } = req.body;
    if (!email || !fullName || !password || !phoneNumber || !role) {
      return res.status(400).json({
        message: "Please fill the form correctly",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "A user with this email is already registered",
        success: false,
      });
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    const dataUri = getDataUri(file);
    let cloudRes = await cloudinary.uploader.upload(dataUri, {
      folder: "profilePhoto",
    });

    user = new User({
      email,
      fullName,
      password: hashedPassword,
      role,
      phoneNumber,
    });
    if (cloudRes) {
      user.profile.profilePhoto = cloudRes.secure_url;
    }
    await user.save();

    return res.status(200).json({
      message: "User registerd succesfully",
      success: true,
    });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({
      message: "An error occured while registering the user",
      success: false,
    });
  }
};

export const logIn = async (req, res) => {
  try {
    let { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Please fill the form correctly",
        success: false,
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        messsage: "No User Found, Invalid email or password",
        success: false,
      });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Ivalid email or password",
        success: false,
      });
    }

    if (role != user.role) {
      return res.status(400).json({
        message: "No user found in this role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    let token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      userid: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({
        message: `Welcome Back ${user.fullName} `,
        user,
        success: true,
      });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "An error occured in loging the user",
      success: false,
    });
  }
};

export const logOut = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
      })
      .json({
        message: "User logged out successfully",
        success: true,
      });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "An error occured in logout of user",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    let { fullName, email, skills, phoneNumber, bio, company } = req.body;
    const skillsArray = skills?.split(",");
    let userId = req.id;
    let file = req.file;
    let user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        message: "Invalid request ",
        success: false,
      });
    }

    const dataUri = getDataUri(file);
    let cloudRes = await cloudinary.uploader.upload(dataUri, {
      folder: "jobPortalCvs",
    });

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (skills) user.profile.skills = skillsArray;
    if (company) user.profile.company = company;
    if (bio) user.profile.bio = bio;

    if (cloudRes) {
      user.profile.resume = cloudRes.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }
    await user.save();

    user = {
      userid: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile Updated Successfully",
      user,
      success: true,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "An error occured in updating user",
      success: false,
    });
  }
};
