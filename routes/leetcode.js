import { leetcodeList } from "../controllers/leetcode.js";
import { authMiddleware } from "../middleware/auth.js";
import express from "express";
const router = express.Router();

router.get("/", authMiddleware, leetcodeList);

export default router;
