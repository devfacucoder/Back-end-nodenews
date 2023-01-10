import userModel from "../models/user.model.js";
import roleModel from '../models/roles.model.js';

import jwt from "jsonwebtoken";

import config from "../config.js";
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailFound = await userModel.findOne({ email });

    if (!emailFound) return res.status(400).json({ message: "email or password incorrect" });

    const passToCompare = emailFound.password;
    const passwordFound = await userModel.comparePassword(
      password,
      passToCompare
    );
    if (!passwordFound) return res.status(503).json({ message: "email or password incorrect" });
    const token = jwt.sign({id:emailFound._id},config.secret,{expiresIn:20000})
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "erro" });
  }
};

export const signup = async (req, res) => {
  const { first_name, last_name, email, age, password, roles } = req.body;
  try {
    const newUser = new userModel({
      first_name,
      last_name,
      email,
      age,
      password: await userModel.enCryptPassword(password),
      roles:await roleModel.findOne({name:"user"})
    });
    const saveUser = await newUser.save();

    const token = jwt.sign({ id: saveUser._id }, config.secret, {
      expiresIn: 20000,
    });
    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "erro" });
  }
};
