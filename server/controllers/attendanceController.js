// check In / out employee

import pool from "../config/db.js";

export const checkInOut = async (req, res) => {
  try {
    const userId = req.session.userId;
    const employee = await pool.query(
      `SELECT * FROM employees WHERE userId=${userId} LIMIT 1`,
    );
    if (employee.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    if (employee.rows.isDeleted) {
      return res
        .status(403)
        .json({ error: "Employee is deleted you cannot check in/out" });
    }
    const currentTime = new Date(); //getting current time
    currentTime.setHours(0, 0, 0, 0); // setting time to 00:00:00 for date comparison

    const attendance = await pool.query();
  } catch (error) {
    res.status(500).json({ error: "Failed to check in/out" });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const userId = req.session.userId;
    const employee = await pool.query(
      `SELECT * FROM employees WHERE userId=${userId} LIMIT 1`,
    );
    if (employee.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    const limit = req.query.limit || 30;
    const attendance = await pool.query(
      `SELECT * FROM attendance WHERE userId=${userId} ORDER BY date DESC LIMIT ${limit}`,
    );
    res.status(200).json({ status: "success", data: attendance.rows });
  } catch (error) {
    res.status(500).json({ error: "Failed to get attendance" });
  }
};
