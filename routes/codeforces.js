import { codeforcesList } from "../controllers/codeforces.js";
import { authMiddleware } from "../middleware/auth.js";
import express from "express";
const router = express.Router();

router.get("/", authMiddleware, codeforcesList);

export default router;
