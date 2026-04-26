import express from "express";
import { protect } from "../middleware/isAuthenticated.js";
import { checkInOut, getAttendance } from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/",protect,checkInOut);
router.get("/",protect,getAttendance);


export default router;