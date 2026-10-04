import express from "express";
import {
  createCategory,
  getCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/create", createCategory);
router.get("/get", getCategory);

export default router;
