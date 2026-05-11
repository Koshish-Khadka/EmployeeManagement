import React from "react";

const LoginLeftBanner = () => {
  return (
    <div className="hidden md:flex w-1/2 bg-blue-950 relative overflow-hidden border-r border-slate-200">
      <div className="relative z-10 flex flex-col items-start justify-center p-12 lg:p-20 w-full h-full">
        <h1 className="text-4xl lg:text-5xl font-medium text-white mb-6 leading-tight tracking-tight">
          Employee <br />
          Management System
        </h1>
        <p className="text-lg max-w-lg leading-relaxed text-slate-400">
          Streamline your workforce operations, track attendance, manage
          payroll, and empower your team securely.
        </p>
      </div>
    </div>
  );
};

export default LoginLeftBanner;
