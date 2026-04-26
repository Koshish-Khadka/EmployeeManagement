import express from "express";
import { createPayslip, getPayslipById, getPayslips } from "../controllers/paySlip.js";
import { protect } from "../middleware/isAuthenticated.js";

const router = express.Router();
router.post("/",protect, createPayslip);
router.get("/",protect,getPayslips);
router.get("/:id",protect,getPayslipById);
export default router;