import express from "express";
import {
  changePassword,
  login,
  session,
} from "../controllers/authController.js";
import { protect } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/login", login);
router.get("/session", protect, session);
router.patch("/change-password", protect, changePassword);

export default router;
