import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// login for employee and admin
// POST api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const result = await pool.query(
      `SELECT * FROM users WHERE email = '${email}'`,
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    // const isValidPassword = password === user.password;
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
    // create token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    console.log("Failed to login", error);
    res.status(500).json({ error: "Failed to login" });
  }
};

export const session = async (req, res) => {
  const session = req.session;
  res.status(200).json({ user: session });
};

export const changePassword = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const checkUser = await pool.query(
      `SELECT * FROM users WHERE id = ${userId}`,
    );
    if (checkUser.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const checkPassword = await bcrypt.compare(
      currentPassword,
      checkUser.rows[0].password,
    );
    if (!checkPassword) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }
    const hashNewPassword = await bcrypt.hash(newPassword, 10);
    const updatePassword = await pool.query(
      `UPDATE users SET password = '${hashNewPassword}' WHERE id = ${userId}`,
    );
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to change password" });
  }
};
