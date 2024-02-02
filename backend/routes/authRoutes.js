import express from "express";
const router = express.Router();
import { signup, login, logout } from "../controllers/authContoller.js";
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

export default router;
