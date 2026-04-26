import e from "express";
import pool from "../config/db.js";
import { inngest } from "../inngest/index.js";

// Create leave
export const createLeave = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { leaveType, startDate, endDate, reason } = req.body;
    const employee = await pool.query(
      `SELECT * FROM employees WHERE userId=${userId} LIMIT 1`,
    );
    if (employee.rows.length === 0) {
      res.status(404).json({ error: "Employee not found" });
    }
    if (employee.rows[0].isDeleted) {
      return res
        .status(403)
        .json({ error: "Employee is deleted you cannot apply for leave" });
    }
    if (!leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(startDate) <= today || new Date(endDate) <= today) {
      return res.status(400).json({ error: "Invalid leave dates" });
    }

    if (new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({ error: "Invalid leave dates" });
    }
    const leave = await pool.query(
      `INSERT INTO leaveApplications (userId, leaveType,startDate,endDate,reason) VALUES (${userId}, ${leaveType}, ${startDate}, ${endDate}, ${reason}) RETURNING *`,
    );

    await inngest.send({
      name: "leave/pending",
      data: {
        leaveApplicationId: leave.rows[0].id,
      },
    });
    res.status(201).json({ status: "success", data: leave.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Failed to create leave" });
  }
};

// get leave
// export const getLeave = async (req, res) => {
//   try {
//     const userId = req.session.userId;
//     // check if users is admin or not;
//     const isAdmin = req.session.role === "admin";
//     if(isAdmin){
//       const status = req.query.status;
//       const where = status ? {status}:{};
//       const leaves = await pool.query(`SELECT * FROM leaveApplications`)
//     }

//   } catch (error) {
//     res.status(500).json({ error: "Failed to get leave" });
//   }
// };

export const getLeave = async (req, res) => {
  try {
    const userId = req.session.userId;
    const isAdmin = req.session.role === "ADMIN";

    if (isAdmin) {
      const status = req.query.status;

      let query = `
        SELECT 
          la.id,
          la.status,
          la.createdAt,
          la.employeeId,
          json_build_object(
            'id', e.id,
            'name', e.name,
            'email', e.email
          ) AS employee
        FROM leaveApplications la
        JOIN employees e ON la.employeeId = e.id
      `;

      const values = [];

      if (status) {
        query += ` WHERE la.status = $1`;
        values.push(status);
      }

      query += ` ORDER BY la.createdAt DESC`;

      const result = await pool.query(query, values);

      const data = result.rows.map((row) => ({
        ...row,
        id: row.id.toString(),
      }));

      return res.json({ data });
    } else {
      //  Get employee safely
      const employeeResult = await pool.query(
        `SELECT * FROM employees WHERE userId = $1 LIMIT 1`,
        [userId],
      );

      if (employeeResult.rows.length === 0) {
        return res.status(404).json({ error: "Employee not found" });
      }

      const employee = employeeResult.rows[0];

      //  Get leaves safely
      const leavesResult = await pool.query(
        `SELECT * FROM leaveApplications WHERE employeeId = $1 ORDER BY createdAt DESC`,
        [employee.id],
      );

      return res.status(200).json({
        data: leavesResult.rows.map((l) => ({
          ...l,
          id: l.id.toString(),
        })),
        employee: {
          ...employee,
          id: employee.id.toString(),
        },
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get leave" });
  }
};

// update leave status
export const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const id = req.params.id;
    if (!status) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const result = await pool.query(
      `UPDATE leaveApplications 
       SET status = $1 
       WHERE id = $2 
       RETURNING *`,
      [status, id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Leave not found" });
    }
    res.status(200).json({ status: "success", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Failed to update leave status" });
  }
};
