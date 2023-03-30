import { codechefList } from "../controllers/codechef.js";
import express from "express";
const router = express.Router();

router.get("/", codechefList);

export default router;
