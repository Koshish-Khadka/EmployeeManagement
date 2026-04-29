import pool from "../config/db.js";

// get profile
export const getProfile = async (req, res) => {
  try {

    const userId = req.session.userId;
    console.log("userId", userId);
    const result = await pool.query(`SELECT * FROM employees WHERE userid=$1`, [
      userId,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json({ status: "success", data: result.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get profile" });
  }
};

// update profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.session.userId;
    const result = await pool.query(
      `SELECT * FROM employees WHERE userId=${userId}`,
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Profile not found" });
    }
    const employeeStatus = result.rows[0].isDeleted;
    if (employeeStatus) {
      return res
        .status(403)
        .json({ error: "Profile is deleted you cannot update it" });
    }
    const { bio } = req.body;
    const updatedProfile = await pool.query(
      `UPDATE employees SET bio = ${bio} WHERE userId = ${userId} RETURNING *`,
    );
    res.status(200).json({ status: "success", data: updateProfile.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};
