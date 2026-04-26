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

// create employee
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
    const userRole = role || "employee";
    const newUser = await pool.query(
      `INSERT INTO users (email,password,role) VALUES (${email},${hashedPassword},${userRole})`,
    );
    const newEmployee = await pool.query(
      `INSERT INTO employees (userId,first_name, last_name, email, phone, position, department, basic_salary, allowances, deductions, join_date, bio) VALUES (${newUser.rows[0].id},${firstName},${lastName},${email},${phone},${position},${department},${basicSalary},${allowances},${deductions},${joinDate},${bio}) RETURNING *`,
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
      `UPDATE employees SET first_name = ${firstName}, last_name = ${lastName}, email = ${email}, phone = ${phone}, position = ${position}, department = ${department}, basic_salary = ${basicSalary}, allowances = ${allowances}, deductions = ${deductions}, employement_status = ${employement_status} WHERE id = ${id} RETURNING *`,
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
    const { id } = req.params;
    // find employee by id
    const employee = await pool.query(
      `SELECT * FROM employees WHERE id = ${id}`,
    );
    if (employee.rows.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const deletedEmployee = await pool.query(
      `UPDATE employees SET employment_status = ${employee.employment_status},isdeleted =${true} WHERE id = ${id} RETURNING *`,
    );
    res.status(200).json({ status: "success", data: deletedEmployee.rows[0] });
  } catch (error) {
    console.log("Failed to deleteEmployee", error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
};
