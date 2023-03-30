import { leetcodeList } from "../controllers/leetcode.js";
import express from "express";
const router = express.Router();

router.get("/", leetcodeList);

export default router;
