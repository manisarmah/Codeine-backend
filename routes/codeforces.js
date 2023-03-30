import { codeforcesList } from "../controllers/codeforces.js";
import express from "express";
const router = express.Router();

router.get("/", codeforcesList);

export default router;
