import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';
const userSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password:String,
    articles:[
      {
        ref:"article",
        type:Schema.Types.ObjectId,
      }
    ],
    roles: {
      ref: "role",
      type: Schema.Types.ObjectId,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.statics.enCryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
userSchema.statics.comparePassword = async (password, recivePassword) => {
  return await bcrypt.compare(password, recivePassword);
};

const userModel = model("users", userSchema);
export default userModel;
