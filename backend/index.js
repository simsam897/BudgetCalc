import express from "express";
import authRouter from "./src/routes/auth.route.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
export default app;
