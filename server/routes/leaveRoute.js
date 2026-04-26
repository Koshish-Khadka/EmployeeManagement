import express from "express";
import {
  createLeave,
  getLeave,
  updateLeaveStatus,
} from "../controllers/leaveController.js";
import { protect, protectAdmin } from "../middleware/isAuthenticated.js";
const router = express.Router();

router.post("/", protect, createLeave);
router.get("/", protect, getLeave);
router.patch("/", protect, protectAdmin, updateLeaveStatus);

export default router;
