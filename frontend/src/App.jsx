import "../src/index.css";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginLanding from "./pages/LoginLanding";
import Layout from "./pages/Layout.jsx";
import Employee from "./pages/Employee";
import Leave from "./pages/Leave";
import PaySlip from "./pages/PaySlip";
import PrintPaySlip from "./pages/PrintPaySlip";
import Setting from "./pages/Setting";
import Attendance from "./pages/Attendance.jsx";

import LoginForm from "./components/LoginForm.jsx";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<LoginLanding />} />
        <Route
          path="/login/admin"
          element={
            <LoginForm
              role="admin"
              title="Admin Login"
              subtitle="Please enter your admin credentials"
            />
          }
        />

        <Route
          path="/login/employee"
          element={
            <LoginForm
              role="employee"
              title="Employee Login"
              subtitle="Please enter your employee credentials"
            />
          }
        />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employee />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/attendance" element={<Attendance />} />

          <Route path="/payslip" element={<PaySlip />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
        <Route path="/print/payslip/:id" element={<PrintPaySlip />} />
        <Route path="*" element={<Navigate replace to="/dashboard" />} />
      </Routes>
    </>
  );
}

export default App;
