import { Plus } from "lucide-react";
import React from "react";
import { DoorOpen, FilePenLine, LogOutIcon } from "lucide-react";
import LeaveForm from "../components/LeaveForm";
import { useQuery } from "@tanstack/react-query";
import api from "../axios/axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Leave = () => {
  const { user } = useAuth();
  const [leaveModalOpen, setLeaveModalOpen] = React.useState(false);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["employeeLeave"],
    queryFn: async () => {
      const response = await api.get("/leave");
      return response.data;
    },
  });

  if (isError) {
    return toast.error("Failed to fetch leave data. Please try again later.");
  }

  if (user.role === "ADMIN") {
    return (
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="mb-6">
            <h1 className="text-2xl font-medium mb-2">Leave Management</h1>
            <p className="text-sm text-gray-600">
              Your leave requests and history
            </p>
          </div>
        </div>
        {/* Table */}
        <div className="card overflow-hidden mt-8">
          <div className="overflow-x-hidden">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>EMPLOYEE</th>
                  <th>TYPES</th>
                  <th>DATES</th>
                  <th>REASON</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-12 text-slate-400"
                    >
                      Loading
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan="4" className="text-center py-12 text-red-400">
                      Failed to load data
                    </td>
                  </tr>
                ) : data?.data.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-12 text-slate-400"
                    >
                      No leave applications found
                    </td>
                  </tr>
                ) : (
                  data?.data?.map((leave) => (
                    <tr key={leave.id}>
                      <td>{leave.employee.name}</td>

                      <td>{leave.leavetype}</td>
                      <td>
                        {new Date(leave.startdate).toLocaleDateString()} -{" "}
                        {new Date(leave.enddate).toLocaleDateString()}
                      </td>

                      <td>{leave.reason}</td>

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            leave.status === "approved"
                              ? "bg-green-100 text-green-600"
                              : leave.status === "rejected"
                                ? "bg-red-100 text-red-600"
                                : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {leave.status || "pending"}
                        </span>
                      </td>
                      <td className="space-x-4">
                        <button className="text-white border p-2 rounded-md border-gray-200 bg-green-600 hover:bg-green-500 transition-all duration-100 hover:scale-105">
                          Edit
                        </button>
                        <button className="text-white border p-2 rounded-md border-gray-200 bg-red-600 hover:bg-red-500 transition-all duration-100 hover:scale-105">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 sm:p-6 ">
          <LeaveForm onClose={() => setLeaveModalOpen(false)} />
        </div>
      )}

      <div className="card overflow-hidden mt-8">
        <div className="overflow-x-hidden">
          <table className="table-modern">
            <thead>
              <tr>
                <th>TYPES</th>
                <th>DATES</th>
                <th>REASON</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="text-center py-12 text-slate-400">
                    No leave applications found
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan="4" className="text-center py-12 text-red-400">
                    Failed to load data
                  </td>
                </tr>
              ) : data?.data?.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-12 text-slate-400">
                    No leave applications found
                  </td>
                </tr>
              ) : (
                data.data.map((leave) => (
                  <tr key={leave.id}>
                    <td>{leave.leavetype}</td>

                    <td>
                      {new Date(leave.startdate).toLocaleDateString()} -{" "}
                      {new Date(leave.enddate).toLocaleDateString()}
                    </td>

                    <td>{leave.reason}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          leave.status === "approved"
                            ? "bg-green-100 text-green-600"
                            : leave.status === "rejected"
                              ? "bg-red-100 text-red-600"
                              : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {leave.status || "pending"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leave;
