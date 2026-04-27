import { Plus } from "lucide-react";
import React from "react";
import { DoorOpen, FilePenLine, LogOutIcon } from "lucide-react";
import LeaveForm from "../components/LeaveForm";

const Leave = () => {
  const [leaveModalOpen, setLeaveModalOpen] = React.useState(false);

  return (
    <div>
      {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center"> */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="mb-6">
          <h1 className="text-2xl font-medium mb-2">Leave Management</h1>
          <p className="text-sm text-gray-600">
            Your leave requests and history
          </p>
        </div>
        <button
          onClick={() => setLeaveModalOpen(true)}
          className="flex justify-center items-center gap-x-3 border w-full py-2 mt-5 rounded-lg bg-blue-700 text-white md:w-fit md:mt-0 hover:bg-blue-800 transition-all duration-150 md:px-4"
        >
          <Plus color="white" className="h-4 w-4" />
          <span className="text-sm">Apply for leave</span>
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
      {/* leave modal */}
      {leaveModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 sm:p-6">
          <LeaveForm />
        </div>
      )}
    </div>
  );
};

export default Leave;
