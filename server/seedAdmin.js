import pool from "./config/db.js";
import bcrypt from "bcryptjs";
const seedAdmin = async () => {
  try {
    const email = process.env.SEED_EMAIL;
    const password = process.env.SEED_PASSWORD;
    //    check the admin

    const checkEmail = await pool.query(`SELECT * FROM users WHERE email=$1`, [
      email,
    ]);
    if (checkEmail.rows.length > 0) {
      console.log("Admin already exists");
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);
    // inset admin data
    const result = await pool.query(
      `INSERT INTO users (email,password,role) VALUES ($1,$2,$3)`,
      [email, hashPassword, "ADMIN"],
    );
    console.log("Admin data seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
