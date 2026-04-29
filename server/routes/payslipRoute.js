import express from "express";
import {
  createPayslip,
  getPayslipById,
  getPayslips,
} from "../controllers/paySlip.js";
import { protect } from "../middleware/isAuthenticated.js";

const router = express.Router();
router.get("/", protect, getPayslips);
router.get("/:id", protect, getPayslipById);
router.post("/", protect, createPayslip);
export default router;
