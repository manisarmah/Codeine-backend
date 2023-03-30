import express from "express";
const router = express.Router();
import { authMiddleware } from "../middleware/auth.js";
import { register, login } from "../controllers/auth.js";
import User from "../models/user.js";
// POST /api/auth/register
router.post("/register", register);

// POST /api/auth/login
router.post("/login", login);

//POST /api/auth/logout
// router.post("/logout", authMiddleware, logout);

// GET /api/auth/user
router.get("/user", authMiddleware, async (req, res) => {
  try {
    // Find user by ID
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
