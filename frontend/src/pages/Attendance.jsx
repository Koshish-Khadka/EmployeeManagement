import { DoorOpen, FilePenLine, LogOutIcon } from "lucide-react";
import React from "react";

const Attendance = () => {
  return (
    <div className="relative">
      <div>
        <h1 className="text-2xl font-medium mb-2">Attendance</h1>
        <p className="text-sm text-gray-600 ">
          Track your work hours and daily check-ins
        </p>
      </div>
      <div className="mt-8 flex flex-col space-y-3 md:grid md:grid-cols-3 md:gap-4 md:space-y-0 ">
        {/* Box */}
        <div className="flex gap-x-4 items-center border border-gray-200 px-5 py-5 border-l-4 border-l-gray-500 rounded-lg transition-all hover:-translate-y-1 duration-200">
          <button className=" p-3 rounded-full  bg-gray-100">
            <FilePenLine className="h-4 w-4" />
          </button>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 ">Days Present</p>
            <p className="text-xl font-bold">20</p>
          </div>
        </div>
        <div className="flex gap-x-4 items-center border border-gray-200 px-5 py-5 border-l-4 border-l-gray-500 rounded-lg transition-all hover:-translate-y-1 duration-200">
          <button className=" p-3 rounded-full  bg-gray-100">
            <FilePenLine className="h-4 w-4" />
          </button>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 ">Days Present</p>
            <p className="text-xl font-bold">20</p>
          </div>
        </div>
        <div className="flex gap-x-4 items-center border border-gray-200 px-5 py-5 border-l-4 border-l-gray-500 rounded-lg transition-all hover:-translate-y-1 duration-200">
          <button className=" p-3 rounded-full  bg-gray-100">
            <FilePenLine className="h-4 w-4" />
          </button>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 ">Days Present</p>
            <p className="text-xl font-bold">20</p>
          </div>
        </div>
      </div>
      {/* Attendance Button */}
      <div className="fixed bottom-5 right-5 transition-all duration-200 hover:scale-105">
        <button className="border flex justify-between items-center gap-x-3 px-3 py-4 rounded-lg bg-green-700 text-white">
          <DoorOpen className="h-8 w-8" />
          <div>
            <p>Clock In</p>
            <p className="text-[10px] text-gray-100 ">start your work day</p>
          </div>
        </button>
      </div>
      {/* table */}
      <div className="card overflow-hidden mt-8">
        <div className="overflow-x-hidden">
          <table className="table-modern">
            <thead>
              <tr>
                <th>DATE</th>
                <th>CHECK IN</th>
                <th>CHECK OUT</th>
                <th>WORKING HOURS</th>
                <th>DAY TYPE</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" className="text-center py-12 text-slate-400">
                  No records found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
