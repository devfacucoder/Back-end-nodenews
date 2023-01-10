import { Router } from "express";
const articlesRoutes = Router();

import * as ctrlArti from "../controllers/articles.controller.js";

//* imports middlewars
import verifyToken from "../validators/verifytoken.js";

//* import permission
import { istjournalist, istAdmin, istUser } from "../validators/permissions.js";
//* import validator
import { istYour } from "../validators/articles.validator.js";

articlesRoutes.get("/", ctrlArti.getAllArticles);

articlesRoutes.get("/:ide", ctrlArti.getByIdArticle);

articlesRoutes.delete(
  "/:ide",
  [verifyToken, istjournalist, istYour],
  ctrlArti.deleteArticleById
);

articlesRoutes.put(
  "/:ide",
  [verifyToken, istjournalist, istYour],
  ctrlArti.updateArticleById
);

articlesRoutes.post("/", [verifyToken, istjournalist], ctrlArti.createArticle);

articlesRoutes.post("/like/:articleID", verifyToken, ctrlArti.getLikeToArticle);

articlesRoutes.post("/comment/:ide", [verifyToken,istUser],ctrlArti.setCommentArticle);

export default articlesRoutes;