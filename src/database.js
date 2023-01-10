import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.URL_CONNECT_DB)
  .then(() => console.log("MongoDB Connect"))
  .catch((err) => console.log(err));


export { mongoose};
