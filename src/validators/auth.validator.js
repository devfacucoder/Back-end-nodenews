import { check, validationResult } from "express-validator";
import checkErrors from "../libs/validar.js";

const signupValidator = [
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
  check("password").not().isEmpty().isString().isStrongPassword(),
  check("roles").isEmpty(),
  (req, res, next) => {
    checkErrors(req, res, next);
  },
];
const signinValidator = [
  check("email").not().isEmpty().isString().isEmail(),  
  check("password").not().isEmpty().isString().isStrongPassword(),
  (req, res, next) => {
    checkErrors(req, res, next);
  },
];
export { signupValidator,signinValidator };
