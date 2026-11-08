import express from "express";
import { login, logout, me } from "../controllers/auth.controller.js";
import protect from "../middleware/protect.js";

const authrouter = express.Router();

authrouter.post("/login", login);
authrouter.post("/logout", logout);
authrouter.get("/me", protect, me);

export default authrouter;
