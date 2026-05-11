// import { Pool } from "pg";
// import dotenv from "dotenv";

// dotenv.config();
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: String(process.env.DB_PASSWORD),
//   port: process.env.DB_PORT,
// });

// pool.connect((err, client, release) => {
//   if (err) {
//     return console.error("❌ Error acquiring client:", err.stack);
//   }
//   console.log("Database connection established successfully");
//   release(); // Always release the client back to the pool!
// });
// export default pool;
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Error acquiring client:", err.stack);
    return;
  }
  console.log("Database connected successfully");
  release();
});

export default pool;
