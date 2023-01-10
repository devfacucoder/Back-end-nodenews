import dotenv from "dotenv";
dotenv.config();
const config = {
  secret: process.env.SECRET,
};
export default config;
