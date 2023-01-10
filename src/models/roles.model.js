import { Schema, model } from "mongoose";
const roleSchema = new Schema({
  name: String,
});
const roleModel = model("role", roleSchema);
export default roleModel;