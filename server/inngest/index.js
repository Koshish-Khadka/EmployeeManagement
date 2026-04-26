import { Inngest } from "inngest";
import pool from "../config/db.js";
import sendEmail from "../config/nodemailer.js";

// Create a client to send and receive events

export const inngest = new Inngest({ id: "my-app" });

export const autoCheckOut = inngest.createFunction(
  {
    id: "auto-check-out",
    triggers: [{ event: "employee/check-out" }],
  },
  async ({ event, step }) => {
    const { employeeId, attendanceId } = event.data;

    await step.sleepUntil(
      "wait-for-9-hours",
      new Date(Date.now() + 9 * 60 * 60 * 1000),
    );

    const attendanceRes = await pool.query(
      "SELECT * FROM attendance WHERE id=$1",
      [attendanceId],
    );

    const attendance = attendanceRes.rows[0];

    if (!attendance?.check_out) {
      const employee = await pool.query("SELECT * FROM employees WHERE id=$1", [
        employeeId,
      ]);

      // reminder email logic here
      await sendEmail({
        to: employee.rows[0].email,
        subject: "Reminder: Please check out",
        body: `<div style="max-width: 600px;">
                    <h2>Hi ${employee.rows[0].firstName}, 👋</h2>
                    <p style="font-size: 16px;">You have a check-in in ${employee.department} today:</p>
                    <p style="font-size: 18px; font-weight: bold; color: #007bff; margin: 8px 0;">${attendance?.checkIn?.toLocaleTimeString()}</p>
                    <p style="font-size: 16px;">Please make sure to check-out in one hour.</p>
                    <p style="font-size: 16px;">If you have any questions, please contact your admin.</p>
                    <br />
                    <p style="font-size: 16px;">Best Regards,</p>
                    <p style="font-size: 16px;">EMS</p>
                </div>`,
      });

      await step.sleepUntil(
        "wait-for-1-hour",
        new Date(Date.now() + 1 * 60 * 60 * 1000),
      );

      const updated = await pool.query("SELECT * FROM attendance WHERE id=$1", [
        attendanceId,
      ]);

      const latest = updated.rows[0];

      if (!latest?.check_out) {
        await pool.query(
          `UPDATE attendance 
           SET check_out = NOW(), workinghour = $1, status = $2
           WHERE id = $3`,
          ["HALF DAY", "LATE", attendanceId],
        );
      }
    }
  },
);

// send email to admin if admin doesn't take action on leave application within 24 hours
const leaveApplicationRemainder = inngest.createFunction(
  {
    id: "leave-application-remainder",
    triggers: [{ event: "leave/pending" }],
  },
  async ({ event, step }) => {
    const { leaveApplicationId } = event.data;
    // wait for 24 hours
    await step.sleepUntil(
      "wait-for-24-hours",
      new Date(Date.now().getTime() + 24 * 60 * 60 * 1000),
    );
    const leaveApplication = await pool.query(
      "SELECT * FROM leave_applications WHERE id=$1",
      [leaveApplicationId],
    );
    if (leaveApplication.rows[0].status === "PENDING") {
      const employee = await pool.query("SELECT * FROM employees WHERE id=$1", [
        leaveApplication.rows[0].employee_id,
      ]);
      // send email to admin about pending leave application
      await sendEmail({
        to: process.env.SENDER_EMAIL,
        subject: "Reminder: Pending Leave Application",
        body: ` <div style="max-width: 600px;">
                <h2>Hi Admin, 👋</h2>
                <p style="font-size: 16px;">You have a leave application in ${employee.department} today:</p>
                <p style="font-size: 18px; font-weight: bold; color: #007bff; margin: 8px 0;">${leaveApplication?.startDate?.toLocaleDateString()}</p>
                <p style="font-size: 16px;">Please make sure to take action on this leave application.</p>
                <br />
                <p style="font-size: 16px;">Best Regards,</p>
                <p style="font-size: 16px;">EMS</p>
            </div>`,
      });
    }
  },
);

// Cron check attendance at 11:30 AM and email absent employees
// const attendanceRemainderCron = inngest.createFunction(
//   { id: "attendance-remainder-cron" },
//   { cron: "0 0 6 * * *" },
//   async ({  step }) => {
// // Get today's date
//     const today = await step.run("get-todays-date", async () => {
//         const startUTC = new Date(new Date().toLocaleDateString("en-US", { timeZone: "Asia/Kathmandu" })+ "T00:00:00 + 05:30");
//         const endUTC = new Date(startUTC.getTime() + 24 * 60 * 60 * 1000);
//         return {startUTC:startUTC.toISOString(), endUTC:endUTC.toISOString()};

//   }),
// );

// Create an empty array where we'll export future Inngest functions
export const functions = [autoCheckOut, leaveApplicationRemainder];
