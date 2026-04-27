import express from "express";
import dotenv from "dotenv";
import pool from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import employeeRoute from "./routes/employeeRoute.js";
import profileRoute from "./routes/profileRoute.js";
import attendanceRoute from "./routes/attendanceRoute.js";
import leaveRoute from "./routes/leaveRoute.js";
import payslipRoute from "./routes/payslipRoute.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

dotenv.config();

const app = express();
app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:5173/",
//   }),
// );
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use("/api/auth", authRoute);
app.use("/api/employees", employeeRoute);
app.use("/api/profile", profileRoute);
app.use("/api/attendance", attendanceRoute);
app.use("/api/leave", leaveRoute);
app.use("/api/payslip", payslipRoute);

// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
  res.status(200).json({ message: " Backend is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running at port http://localhost:${PORT}`);

  // Immediate database test
  pool
    .query("SELECT NOW()")
    .then((res) =>
      console.log("✅ Postgres Connection Verified:", res.rows[0].now),
    )
    .catch((err) => console.error("❌ Postgres Connection Failed:", err.stack));
});
