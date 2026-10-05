import express from "express";
import {
  createBudget,
  getAllBudget,
  getBudgetById,
} from "../controllers/budget.controller.js";
import { verifyToken } from "../Middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", verifyToken, createBudget);
router.get("/getallbudgets", verifyToken, getAllBudget);
router.get("/getbudgetbyid/:id", verifyToken, getBudgetById);

export default router;
