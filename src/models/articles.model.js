import { Schema, model } from "mongoose";

const articleSchema = new Schema(
  {
    //TODO crear un sistema de likes
    tilH2: String,
    subtitle: String,
    author: { ref: "users", type: Schema.Types.ObjectId },
    sections: [
      {
        tilH3: String,
        textP: String,
        imgUrl: String,
      },
    ],
    likes: [
      {
        ref: "user",
        type: Schema.Types.ObjectId,
      },
    ],
    commets: [
      {
        commentAuthorId: {
          ref: "user",
          type: Schema.Types.ObjectId,
        },
        comment: String,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const articleModel = model("article", articleSchema);

export default articleModel;
