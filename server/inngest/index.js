import { Inngest } from "inngest";
import pool from "../config/db.js";
import sendEmail from "../config/nodemailer.js";

// Create a client to send and receive events

export const inngest = new Inngest({ id: "my-app" });

// auto checkout function for employee
export const autoCheckOut = inngest.createFunction(
  {
    id: "auto-check-out",
    triggers: [{ event: "employee/check-out" }],
  },
  async ({ event, step }) => {
    const { employeeId, attendanceId } = event.data;

    // await step.sleepUntil(
    //   "wait-for-9-hours",
    //   new Date(Date.now() + 9 * 60 * 60 * 1000),
    // );
    await step.sleep("wait-for-9-hours", "9h");

    // const attendanceRes = await pool.query(
    //   "SELECT * FROM attendance WHERE id=$1",
    //   [attendanceId],
    // );

    const attendanceRes = await step.run("get-attendance", async () => {
      return await pool.query("SELECT * FROM attendance WHERE id=$1", [
        attendanceId,
      ]);
    });

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
                    <h2>Hi ${employee.rows[0].firstName}, </h2>
                    <p style="font-size: 16px;">You have a check-in in ${employee.rows[0].department} today:</p>
                    <p style="font-size: 18px; font-weight: bold; color: #007bff; margin: 8px 0;">${attendance?.checkIn?.toLocaleTimeString()}</p>
                    <p style="font-size: 16px;">Please make sure to check-out in one hour.</p>
                    <p style="font-size: 16px;">If you have any questions, please contact your admin.</p>
                    <br />
                    <p style="font-size: 16px;">Best Regards,</p>
                    <p style="font-size: 16px;">EMS</p>
                </div>`,
      });

      // await step.sleepUntil(
      //   "wait-for-1-hour",
      //   new Date(Date.now() + 1 * 60 * 60 * 1000),
      // );
      await step.sleep("wait-for-1-hour", "1h");

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
    // await step.sleepUntil(
    //   "wait-for-24-hours",
    //   new Date(Date.now().getTime() + 24 * 60 * 60 * 1000),
    // );

    await step.sleep("wait-for-24-hours", "24h");

    // const leaveApplication = await pool.query(
    //   "SELECT * FROM leave_applications WHERE id=$1",
    //   [leaveApplicationId],
    // );
    const leaveApplication = await step.run(
      "get-leave-application",
      async () => {
        return await pool.query(
          "SELECT * FROM leave_applications WHERE id=$1",
          [leaveApplicationId],
        );
      },
    );

    const leave = leaveApplication.rows[0];
    if (!leave) return;

    if (leaveApplication.rows[0].status === "PENDING") {
      // const employee = await pool.query("SELECT * FROM employees WHERE id=$1", [
      //   leaveApplication.rows[0].employee_id,
      // ]);
      const employee = await step.run("get-employee", async () => {
        return await pool.query("SELECT * FROM employees WHERE id=$1", [
          leave.employeeid,
        ]);
      });
      // send email to admin about pending leave application
      await sendEmail({
        to: process.env.SENDER_EMAIL,
        subject: "Reminder: Pending Leave Application",
        body: ` <div style="max-width: 600px;">
                <h2>Hi Admin, 👋</h2>
                <p style="font-size: 16px;">You have a leave application in ${employee.rows[0].department} today:</p>
                <p style="font-size: 18px; font-weight: bold; color: #007bff; margin: 8px 0;">${leaveApplication?.startdate?.toLocaleDateString()}</p>
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
// const attendanceReminderCron = inngest.createFunction(
//   {
//     id: "attendance-reminder-cron",

//     triggers: [
//       {
//         cron: "0 30 11 * * *",
//       },
//     ],
//   },

//   async ({ step }) => {
//     // Get today's range
//     const { startOfDay, endOfDay } = await step.run(
//       "get-today-range",
//       async () => {
//         const now = new Date();

//         const startOfDay = new Date(
//           now.getFullYear(),
//           now.getMonth(),
//           now.getDate(),
//           0,
//           0,
//           0,
//         );

//         const endOfDay = new Date(
//           now.getFullYear(),
//           now.getMonth(),
//           now.getDate(),
//           23,
//           59,
//           59,
//         );

//         return {
//           startOfDay: startOfDay.toISOString(),
//           endOfDay: endOfDay.toISOString(),
//         };
//       },
//     );

//     // Get absent employees
//     const absentEmployees = await step.run("get-absent-employees", async () => {
//       const result = await pool.query(
//         `
//           SELECT id, first_name, email, department
//           FROM employees e
//           WHERE NOT EXISTS (
//             SELECT 1
//             FROM attendance a
//             WHERE a.employee_id = e.id
//             AND a.check_in BETWEEN $1 AND $2
//           )
//           `,
//         [startOfDay, endOfDay],
//       );

//       return result.rows;
//     });

//     // If everyone is present
//     if (absentEmployees.length === 0) {
//       return {
//         message: "All employees checked in today",
//       };
//     }

//     // Send ONE email to admin
//     await step.run("send-admin-report", async () => {
//       const employeeListHtml = absentEmployees
//         .map(
//           (emp, index) => `
//             <tr>
//               <td style="padding: 8px;">${index + 1}</td>
//               <td style="padding: 8px;">${emp.first_name}</td>
//               <td style="padding: 8px;">${emp.email}</td>
//               <td style="padding: 8px;">${emp.department}</td>
//             </tr>
//           `,
//         )
//         .join("");

//       await sendEmail({
//         to: process.env.ADMIN_EMAIL, // IMPORTANT: admin email

//         subject: "Daily Attendance Report - Absent Employees",

//         body: `
//           <div style="max-width: 700px;">
//             <h2>Hi Admin 👋</h2>

//             <p style="font-size: 16px;">
//               The following employees have not checked in today:
//             </p>

//             <table style="width: 100%; border-collapse: collapse;">
//               <thead>
//                 <tr>
//                   <th style="text-align:left;">#</th>
//                   <th style="text-align:left;">Name</th>
//                   <th style="text-align:left;">Email</th>
//                   <th style="text-align:left;">Department</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 ${employeeListHtml}
//               </tbody>
//             </table>

//             <br />

//             <p style="font-size: 16px;">
//               Please review and take necessary action.
//             </p>

//             <p>Best Regards,<br/>EMS</p>
//           </div>
//         `,
//       });
//     });

//     return {
//       success: true,
//       absentCount: absentEmployees.length,
//     };
//   },
// );

// Create an empty array where we'll export future Inngest functions
export const functions = [
  autoCheckOut,
  leaveApplicationRemainder,
  // attendanceReminderCron
];
