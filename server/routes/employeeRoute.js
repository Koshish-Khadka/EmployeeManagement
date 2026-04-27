import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  updateEmployee,
} from "../controllers/employeeController.js";
import { protect, protectAdmin } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/allemployee", protect, protectAdmin, getEmployee);
router.post("/createemployee", protect, protectAdmin, createEmployee);
router.put("/updateemployee", protect, protectAdmin, updateEmployee);
router.put("/deleteemployee/:id", protect, protectAdmin, deleteEmployee);

export default router;
