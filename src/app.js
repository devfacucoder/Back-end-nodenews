import express from "express";
const app = express();
import cors from 'cors'
app.get("/", (req, res) => {
  res.send("hola");
});

//
app.use(cors())
app.use(express.json());

//check roles
/* import { createRoles } from './libs/createRoles'
createRoles() */

//*imports de routes
import userRoutes from "./routes/user.routes.js";
import articlesRoutes from "./routes/articles.routes.js";
import authRoutes from "./routes/auth.routes.js";
//*Routes
app.use("/api/articles", articlesRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth",authRoutes);

export default app;
