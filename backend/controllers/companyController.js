import { Company } from "../models/companyModel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const registerCompany = async (req, res) => {
  try {
    let { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Company Name is Already Taken",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(200).json({
      message: "Company Registered Succesfully",
      company,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getCompany = async (req, res) => {
  try {
    let userId = req.id;
    let companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "No company is found",
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getCompanyById = async (req, res) => {
  try {
    let companyId = req.params.id;
    let company = await Company.findById(companyId);
    if (!companyId) {
      return res.status(404).json({
        message: "No Company fouund With this Id",
        succes: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export const updateCompany = async (req, res) => {
  try {
    let { name, description, website, location } = req.body;
    let file = req.file;
    const dataUri = getDataUri(file);
    let cloudRes = await cloudinary.uploader.upload(dataUri, {
      folder: "companyLogos",
    });
    let updateData = { name, description, website, location };

    let company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Not Updated",
        success: false,
      });
    }

    if (cloudRes) {
      company.logo = cloudRes.secure_url;
    }
    await company.save();

    return res.status(200).json({
      message: "Comapny Updated Succesfully",
      success: true,
    });
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      message: "Not Updated ",
      success: false,
    });
  }
};
