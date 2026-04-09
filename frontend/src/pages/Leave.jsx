import { Plus } from "lucide-react";
import React from "react";
import { DoorOpen, FilePenLine, LogOutIcon } from "lucide-react";

const Leave = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between items-center">
        <div className="mb-6">
          <h1 className="text-2xl font-medium mb-2">Leave Management</h1>
          <p className="text-sm text-gray-600">
            Your leave requests and history
          </p>
        </div>
        <button className="border py-2 md:px-4 flex justify-center items-center gap-x-2  rounded-lg bg-blue-600 text-white ">
          <Plus className="h-4 w-4" />
          <p>Apply for Leave</p>
        </button>
      </div>
      <div className="mt-6 flex flex-col space-y-3 md:grid md:grid-cols-3 md:gap-4 md:space-y-0 ">
        {/* Box */}
        <div className="flex gap-x-4 items-center border border-gray-200 px-5 py-5 border-l-4 border-l-gray-500 rounded-lg transition-all hover:-translate-y-1 duration-200">
          <button className=" p-3 rounded-full  bg-gray-100">
            <FilePenLine className="h-4 w-4" />
          </button>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 ">Sick Leave</p>
            <div className="flex items-center gap-x-2">
              <p className="text-xl font-bold">20</p>
              <p className="text-sm font-light text-gray-600">taken</p>
            </div>
          </div>
        </div>
        <div className="flex gap-x-4 items-center border border-gray-200 px-5 py-5 border-l-4 border-l-gray-500 rounded-lg transition-all hover:-translate-y-1 duration-200">
          <button className=" p-3 rounded-full  bg-gray-100">
            <FilePenLine className="h-4 w-4" />
          </button>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 ">Casual Leave</p>
            <div className="flex items-center gap-x-2">
              <p className="text-xl font-bold">20</p>
              <p className="text-sm font-light text-gray-600">taken</p>
            </div>
          </div>
        </div>
        <div className="flex gap-x-4 items-center border border-gray-200 px-5 py-5 border-l-4 border-l-gray-500 rounded-lg transition-all hover:-translate-y-1 duration-200">
          <button className=" p-3 rounded-full  bg-gray-100">
            <FilePenLine className="h-4 w-4" />
          </button>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 ">Annual Leave</p>
            <div className="flex items-center gap-x-2">
              <p className="text-xl font-bold">20</p>
              <p className="text-sm font-light text-gray-600">taken</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leave;
