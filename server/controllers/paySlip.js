import pool from "../config/db.js";

// create payslip
export const createPayslip = async (req, res) => {
  try {
    const { employeeId, month, year, basicSalary, allowances, deductions } =
      req.body;

    if (
      !employeeId ||
      !month ||
      !year ||
      basicSalary == null ||
      allowances == null ||
      deductions == null
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const netSalary =
      Number(basicSalary) + Number(allowances || 0) - Number(deductions || 0);

    const result = await pool.query(
      `INSERT INTO payslip 
       (employeeId, month, year, basicSalary, allowances, deductions, netSalary) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [employeeId, month, year, basicSalary, allowances, deductions, netSalary],
    );

    res.status(201).json({
      status: "success",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create payslip" });
  }
};

// get payslip
export const getPayslips = async (req, res) => {
  try {
    const session = req.session;
    const userId = session.userId;
    const isAdmin = session.role === "ADMIN";

    // admin
    if (isAdmin) {
      const result = await pool.query(`
        SELECT 
          p.id,
          p.month,
          p.year,
          p.basicSalary,
          p.allowances,
          p.deductions,
          p.netSalary,
          p.createdAt,
          p.employeeId,

          json_build_object(
            'id', e.id,
            'name', e.name,
            'email', e.email
          ) AS employee

        FROM payslip p
        JOIN employees e ON p.employeeId = e.id
        ORDER BY p.createdAt DESC
      `);

      const data = result.rows.map((row) => ({
        ...row,
        id: row.id.toString(),
        employeeId: row.employeeid?.toString(),
      }));

      return res.json({ data });
    } else {
      // Get employee using userId
      const employeeResult = await pool.query(
        `SELECT * FROM employees WHERE userId = $1 LIMIT 1`,
        [userId],
      );

      if (employeeResult.rows.length === 0) {
        return res.status(404).json({ error: "Not found" });
      }

      const employee = employeeResult.rows[0];

      // Get payslips of this employee
      const payslipResult = await pool.query(
        `SELECT * FROM payslip 
         WHERE employeeId = $1 
         ORDER BY createdAt DESC`,
        [employee.id],
      );

      const data = payslipResult.rows.map((p) => ({
        ...p,
        id: p.id.toString(),
      }));

      return res.json({ data });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed" });
  }
};
// get payslip by id
export const getPayslipById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query(
      `SELECT p.*, e.* 
   FROM payslip p
   JOIN employees e ON p.employeeId = e.id
   WHERE p.employeeId = $1`,
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    const payslip = {
      ...result,
      id: result.id.toString(),
      employee: result.employeeId,
    };
    return res.json(payslip);
  } catch (error) {
    res.status(500).json({ error: "Failed to get payslip" });
  }
};
