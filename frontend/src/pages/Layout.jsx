import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <div className="flex h-screen">
      {" "}
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 pt-16 sm:p-6 lg:p-8 max-w-400 mx-auto bg-gray-300">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
