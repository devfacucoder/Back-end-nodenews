import app from "./app.js";
const port = 5000;

import {mongoose} from "../src/database.js";

app.listen(port,()=>{
  console.log(`server on http://localhost:${port}`)
})
