import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authrouter from "./route/auth.route.js";

const app = express();

dotenv.config();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authrouter);

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on port ${port}`);
});