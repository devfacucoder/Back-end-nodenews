import { check } from "express-validator";
import checkErrors from "../libs/validar.js";
import articleModel from "../models/articles.model.js";

export const istYour = [
  check("ide").custom(async (value, { req }) => {
    const userJournalist = await articleModel.findById(value);
    if (userJournalist.author == req.userID) {
      
      return true;
    } else throw new Error("el articulo no es tuyo");
  }),

  (req, res, next) => {
    checkErrors(req, res, next);
  },
];
// wucuanlaper