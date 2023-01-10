import { Router } from "express";
const authRoutes = Router();

import * as ctrlAuth from "../controllers/auth.controller.js";

import {signupValidator,signinValidator} from '../validators/auth.validator.js'

authRoutes.post("/up",signupValidator ,ctrlAuth.signup);

authRoutes.post("/in",signinValidator ,ctrlAuth.signin);

export default authRoutes;