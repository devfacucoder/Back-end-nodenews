import { Router } from "express";
const userRoutes = Router();

//* imports of the controllers
import * as ctrl from "../controllers/user.controller.js";

//* imports middlewars
import verifyToken from "../validators/verifytoken.js"; //verificar token
import {
  createValidator,
  deleteUserValidator,
} from "../validators/user.validator.js";
//* import permission
import { istAdmin } from "../validators/permissions.js";

userRoutes.get("/",[verifyToken,istAdmin], ctrl.getUsers);

userRoutes.get("/:ide", ctrl.getOneUserById);

userRoutes.post("/", [verifyToken, istAdmin, createValidator], ctrl.createUser);

userRoutes.delete(
  "/:ide",
  [verifyToken, istAdmin, deleteUserValidator],
  ctrl.deleteUser
);

userRoutes.put("/:ide", [verifyToken, istAdmin], ctrl.updateUser);

export default userRoutes;
