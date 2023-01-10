import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import roleModel from "../models/roles.model.js";
import config from "../config.js";
//!no sirve ya
export const istUser = async (req, res, next) => {
  try {
    const userToPermiss = await userModel.findById(req.userID);
    const role = await roleModel.findById(userToPermiss.roles);
    if (
      role.name === "moderator" ||
      role.name === "admin" ||
      role.name === "journalist"||
      role.name === "user"
    ) return next();
    
    else return res.status(503).json({ message: "no access" });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "error" });
  }
};

export const istjournalist = async (req, res, next) => {
  try {
    const journalist = await userModel.findById(req.userID);
    const role = await roleModel.findById(journalist.roles);

    if (role.name === "journalist") return next();
    else return res.status(503).json({ message: "no access" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error" });
  }
};

export const istAdmin = async (req, res, next) => {
  try {
    const admin = await userModel.findById(req.userID);
    const role = await roleModel.findById(admin.roles);

    if (role.name === "admin") return next();
    else return res.status(503).json({ message: "no access" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error" });
  }
};

export const istModerator = async (req, res, next) => {
  try {
    const admin = await userModel.findById(req.userID);
    const role = await roleModel.findById(admin.roles);

    if (role.name === "moderator") return next();
    else return res.status(503).json({ message: "no access" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error" });
  }
};
export const journalistOrAdminOrModetator = async (req, res, next) => {
  try {
    const userToPermiss = await userModel.findById(req.userID);
    const role = await roleModel.findById(userToPermiss.roles);

    if (
      role.name === "moderator" ||
      role.name === "admin" ||
      role.name === "journalist"
    ) return next();
    
    else return res.status(503).json({ message: "no access" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error" });
  }
};
