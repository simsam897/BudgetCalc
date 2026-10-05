import express from "express";
import authRouter from "./src/routes/auth.route.js";
import categoryRouter from "./src/routes/category.route.js";
import budgetRouter from "./src/routes/budget.route.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/budget", budgetRouter);
export default app;
