// check In / out employee

import pool from "../config/db.js";

export const checkInOut = async (req, res) => {
  try {
    const userId = req.session.userId;
    const employeeResult = await pool.query(
      `SELECT * FROM employees WHERE userId=$1 LIMIT 1`,
      [userId],
    );

    if (employeeResult.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    const employee = employeeResult.rows[0];
    const employeeId = employee.id;

    if (employee.isDeleted) {
      return res
        .status(403)
        .json({ error: "Employee is deleted you cannot check in/out" });
    }
    // const today = new Date(); //getting current time
    // today.setHours(0, 0, 0, 0); // setting time to 00:00:00 for date comparison
    const today = new Date().toLocaleDateString("en-CA");

    // check for existing attendance
    const existing = await pool.query(
      `SELECT * FROM attendance 
   WHERE employeeid = $1 AND date = $2 
   LIMIT 1`,
      [employeeId, today],
    );

    const now = new Date();

    if (existing.rows.length === 0) {
      // no existing attendance for today
      const isLate =
        now.getHours() > 9 || (now.getHours() === 9 && now.getMinutes() > 0);

      const attendance = await pool.query(
        `INSERT INTO attendance 
     (employeeid, date, check_in, status) 
     VALUES ($1, $2, $3, $4) 
     RETURNING *`,
        [employeeId, today, now, isLate ? "LATE" : "PRESENT"],
      );

      return res.status(200).json({
        success: true,
        type: "CHECK-IN",
        data: attendance.rows[0],
      });
    } else if (existing.rows.length === 1 && !existing.rows[0].check_out) {
      const checkInTime = new Date(existing.rows[0].check_in).getTime();
      const now = new Date();

      const diffMS = now.getTime() - checkInTime;
      const diffHours = diffMS / (1000 * 60 * 60);

      const workingHours = parseFloat(diffHours.toFixed(2));

      let dayType = "Short Day";
      if (workingHours >= 8) dayType = "Full Day";
      else if (workingHours >= 6) dayType = "Three Quarter Day";
      else if (workingHours >= 4) dayType = "Half Day";

      //  Update DB properly
      const updated = await pool.query(
        `UPDATE attendance 
     SET check_out = $1, workinghour = $2, daytype = $3 
     WHERE id = $4 
     RETURNING *`,
        [now, workingHours, dayType, existing.rows[0].id],
      );

      return res.status(200).json({
        success: true,
        type: "CHECK-OUT",
        data: updated.rows[0],
      });
    } else {
      return res.status(400).json({
        error: "Already checked out for today",
      });
    }
  } catch (error) {
    console.log("Attendance error", error);
    res.status(500).json({ error: "Failed to check in/out" });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const userId = req.session.userId;
    const employeeResult = await pool.query(
      `SELECT * FROM employees WHERE userId=$1 LIMIT 1`,
      [userId],
    );
    if (employeeResult.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    const employee = employeeResult.rows[0];
    const employeeId = employee.id;
    const limit = req.query.limit || 30;
    const attendance = await pool.query(
      `SELECT * FROM attendance WHERE employeeid=$1 ORDER BY date DESC LIMIT $2`,
      [employeeId, limit],
    );
    res.status(200).json({ status: "success", data: attendance.rows });
  } catch (error) {
    console.log("Failed to get attendance", error);
    res.status(500).json({ error: "Failed to get attendance" });
  }
};
