import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";

const router = express.Router()

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Test routes for browser access (development only)
router.get("/test", (req, res) => {
  res.json({ message: "Auth routes are working! Use POST for login/register" });
});

export default router;

