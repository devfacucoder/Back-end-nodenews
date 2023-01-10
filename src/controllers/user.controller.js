import userModel from "../models/user.model.js";
import roleModel from "../models/roles.model.js";
const createUser = async (req, res) => {
  try {
    //TODO cuando se cree un usuario por el admin tiene que haber un registro donde dice quien lo creo y/o modifico :)
    const { first_name, last_name, email, age, password, roles } = req.body;
    const roleID = await roleModel.findOne({ name: roles });
    const newUser = new userModel({
      first_name,
      last_name,
      email,
      age,
      password: await userModel.enCryptPassword(password),
      roles: roleID._id,
    });
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(400).send("error");
    console.log(error);
  }
};
const getOneUserById = async (req, res) => {
  try {
    const { ide } = req.params;
    const user = await userModel.findOne({ _id: ide });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send("error");
    console.log(error);
  }
};
const getUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).send("error");
    console.log(error);
  }
};
const deleteUser = async (req, res) => {
  try {
    const { ide } = req.params;
    await userModel.findByIdAndDelete({ _id: ide });
    res.status(200).json({ message: "eliminated" });
  } catch (error) {
    res.status(400).send("error");
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const userDB = await userModel.findByIdAndUpdate(req.params.ide, req.body, {
      new: true,
    });
    res.status(200).json(userDB);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export { createUser, getUsers, deleteUser, getOneUserById, updateUser };
