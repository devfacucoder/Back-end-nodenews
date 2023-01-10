import { check } from "express-validator";
import checkErrors from "../libs/validar.js";
import jwt from "jsonwebtoken";
import config from "../config.js";
const verifyToken = [
  check("x-access-token")
    .not()
    .isEmpty()
    .isJWT()
    .custom((value, { req }) => {
      const very = jwt.verify(value, config.secret);
      if (very) {
        req.userID = very.id;
        return true;
      }
      throw new Error("error en el token");
    }),
  (req, res, next) => {
    checkErrors(req, res, next);
  },
];
export default verifyToken;
