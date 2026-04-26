import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: String(process.env.DB_PASSWORD),
  port: process.env.DB_PORT,
});

// pool.on("connect", () => {
//   console.log("Connected to the PostgreSQL database");
// });
pool.connect((err, client, release) => {
  if (err) {
    return console.error("❌ Error acquiring client:", err.stack);
  }
  console.log("Database connection established successfully");
  release(); // Always release the client back to the pool!
});
export default pool;
