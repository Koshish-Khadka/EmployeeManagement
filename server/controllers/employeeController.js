import pool from "../config/db.js";
import bcrypt from "bcryptjs";

// Get employee
export const getEmployee = async (req, res) => {
  try {
    const employee = await pool.query("SELECT * FROM employees");
    if (employee.rows.length === 0) {
      res.status(404).json({ message: "No employee found" });
    }
    res.status(200).json({ status: "success", data: employee.rows });
  } catch (error) {
    console.log("Failed to getEmployee", error);
    res.status(500).json({ error: "Failed to fetch employee" });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      position,
      department,
      basicSalary,
      allowances,
      deductions,
      joinDate,
      password,
      role,
      bio,
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role || "EMPLOYEE";

    const newUser = await pool.query(
      `INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id`,
      [email, hashedPassword, userRole],
    );

    const newEmployee = await pool.query(
      `INSERT INTO employees 
      (userId, firstName, lastName, email, phone, position, basicSalary, allowances, deductions, joinDate, bio,department) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) 
      RETURNING *`,
      [
        newUser.rows[0].id,
        firstName,
        lastName,
        email,
        phone,
        position,
        basicSalary,
        allowances,
        deductions,
        joinDate,
        bio,
        department,
      ],
    );

    res.status(201).json({ status: "success", data: newEmployee.rows[0] });
  } catch (error) {
    console.log("Failed to createEmployee", error);
    res.status(500).json({ error: "Failed to create employee" });
  }
};
// update employee

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      firstName,
      lastName,
      email,
      phone,
      position,
      department,
      basicSalary,
      allowances,
      deductions,
      password,
      role,
      bio,
      employement_status,
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // find employee by id
    const employee = await pool.query(
      `SELECT * FROM employees WHERE id = ${id}`,
    );
    if (employee.rows.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const updatedEmployee = await pool.query(
      `UPDATE employees SET first_name = $1, last_name = $2, email = $3, phone = $4, position = $5, department = $6, basic_salary = $7, allowances = $8, deductions = $9, employement_status = $10 WHERE id = $11 RETURNING *`,
      [
        firstName,
        lastName,
        email,
        phone,
        position,
        department,
        basicSalary,
        allowances,
        deductions,
        employement_status,
        id,
      ],
    );

    res.status(201).json({ status: "success", data: updatedEmployee.rows[0] });
  } catch (error) {
    console.log("Failed to updateEmployee", error);
    res.status(500).json({ error: "Failed to update employee" });
  }
};

// delete employee
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("delete function");
    console.log(req.body);
    // find employee by id
    const employee = await pool.query(`SELECT * FROM employees WHERE id = $1`, [
      id,
    ]);

    if (employee.rows.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const deletedEmployee = await pool.query(
      `UPDATE employees 
       SET employment_status = $1, isdeleted = $2 
       WHERE id = $3 
       RETURNING *`,
      ["Inactive", true, id],
    );
    res.status(200).json({ status: "success", data: deletedEmployee.rows[0] });
  } catch (error) {
    console.log("Failed to deleteEmployee", error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
};
