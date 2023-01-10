import { check } from "express-validator";
import checkErrors from "../libs/validar.js";
const createValidator = [
  check("first_name").not().isEmpty().isString(),
  check("last_name").not().isEmpty().isString(),
  check("email").not().isEmpty().isString().isEmail(),
  check("age")
    .not()
    .isEmpty()
    .isNumeric()
    .custom((value) => {
      if (value < 18) throw new Error("esa edad no esta permitida");
      else if (value > 100) throw new Error("esa edad no es logica");
      return true;
    }),
  check("password")
    .not()
    .isEmpty()
    .isString()
    .isStrongPassword()
    .withMessage("mal"),
  check("roles")
    .not()
    .isEmpty()
    .isString()
    .custom((value) => {
      if (
        value === "moderator" ||
        value === "admin" ||
        value === "journalist" ||
        value === "user"
      )
        return true;
      else throw new Error("el role esta prohibido");
    }),
  (req, res, next) => {
    checkErrors(req, res, next);
  },
];
export { createValidator };
const deleteUserValidator = [
  check("ide").not().isEmpty(),
  (req, res, next) => {
    checkErrors(req, res, next);
  },
];
export { deleteUserValidator };
