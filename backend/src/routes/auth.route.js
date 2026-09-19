import express, { Router } from "express";
import {
  getCurrentUser,
  signin,
  signup,
} from "../controllers/auth.controllers.js";
import { verifyToken } from "../Middlewares/auth.middleware.js";

const router = express(Router());

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/currentuser",verifyToken ,  getCurrentUser);

export default router;
