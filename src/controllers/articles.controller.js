import articleModel from "../models/articles.model.js";
import userModel from "../models/user.model.js";
export const createArticle = async (req, res) => {
  const { tilH2, subtitle, sections } = req.body;
  const newArticle = new articleModel({
    author: req.userID,
    tilH2,
    subtitle,
    sections,
  });
  const saveArticle = await newArticle.save();
  await userModel.findByIdAndUpdate(req.userID, {
    $push: { articles: saveArticle._id },
  });

  res.status(201).json(newArticle);
};

export const getAllArticles = async (req, res) => {
  try {
    const allArticles = await articleModel.find();
    res.status(200).json(allArticles);
  } catch (error) {
    console.log(error);
    res.status(400).json({ err: "error" });
  }
};

export const getByIdArticle = async (req, res) => {
  const { ide } = req.params;
  try {
    const article = await articleModel.findOne({ _id: ide });
    res.status(200).json(article);
  } catch (error) {
    console.log(error);
    res.status(400).json({ err: "error" });
  }
};

export const deleteArticleById = async (req, res) => {
  const { ide } = req.params;
  try {
    const userAuthor = await userModel.findByIdAndUpdate(req.userID, {
      $pull: { articles: ide },
    });
    const article = await articleModel.findByIdAndDelete({ _id: ide });

    res.status(200).json({ messge: "elemnto eliminado" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ err: "error" });
  }
};


//TODO hacer una funcion de update
export const updateArticleById = async (req, res) => {
  try {
    const { ide } = req.params;
    const article = await articleModel.findByIdAndUpdate(ide, req.body, {
      new: true,
    });
    res.status(200).json(article);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error" });
  }
};
export const getLikeToArticle = async (req, res) => {
  const { articleID } = req.params;
  try {
    const articleLiker = await articleModel.findById(articleID);

    articleLiker.likes.push(req.userID);
    const artiSave = await articleLiker.save();

    res.status(200).json(articleLiker);
  } catch (error) {
    console.log(error);
    res.status(400).json({ err: "error" });
  }
};

export const setCommentArticle = async (req, res) => {
  try {
    const { ide } = req.params;
    const { comment } = req.body;
    const articleDB = await articleModel.findByIdAndUpdate(
      ide,
      {
        $push: {
          commets: {
            commentAuthorId: req.userID,
            comment,
          },
        },
      },
      {
        new: true,
      }
    );
    res.status(201).json({ articleDB });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error" });
  }
};
