import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { DoorOpen, FilePenLine, LogOutIcon } from "lucide-react";
import React from "react";
import api from "../axios/axios";
import toast from "react-hot-toast";

const Attendance = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["attendance"],
    queryFn: async () => {
      const response = await api.get("/attendance");
      return response.data;
    },
  });

  const handleAttendance = useMutation({
    mutationFn: async () => {
      const response = await api.post("/attendance");
      return response.data;
    },
    onSuccess: () => {
      toast.success("Check-In Success");
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
    },
    onError: () => {
      toast.error("Failed to check-in");
    },
  });
  const formatLocalDate = (date) => new Date(date).toLocaleDateString("en-CA");

  const today = formatLocalDate(new Date());

  const todayAttendance = data?.data?.find(
    (item) => formatLocalDate(item.date) === today,
  );

  const isCheckedIn = todayAttendance && !todayAttendance.check_out;
  const isCheckedOut = todayAttendance && todayAttendance.check_out;
  
  // const today = new Date().toLocaleDateString("en-CA");
  // const todayAttendance = data?.data?.find(
  //   (item) => new Date(item.date).toLocaleDateString("en-CA") === today,
  // );

  // console.log("Today attendance", todayAttendance);

  // const isCheckedIn = todayAttendance && !todayAttendance.check_out;
  // const isCheckedOut = todayAttendance && todayAttendance.check_out;

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
        <button
          className={`border flex items-center gap-x-3 px-3 py-4 rounded-lg text-white ${
            isCheckedOut
              ? "bg-gray-500 cursor-not-allowed"
              : isCheckedIn
                ? "bg-slate-700"
                : "bg-green-700"
          }`}
          onClick={() => handleAttendance.mutate()}
          disabled={isCheckedOut}
        >
          <DoorOpen className="h-8 w-8" />
          <div>
            <p>
              {isCheckedOut
                ? "Completed"
                : isCheckedIn
                  ? "Clock Out"
                  : "Clock In"}
            </p>
            <p className="text-[10px] text-gray-100">
              {isCheckedOut
                ? "You have completed today"
                : isCheckedIn
                  ? "End your work day"
                  : "Start your work day"}
            </p>
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
              {data?.data.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-12 text-slate-400">
                    No records found
                  </td>
                </tr>
              ) : isLoading ? (
                <tr>
                  <td colSpan="4" className="text-center py-12 text-slate-400">
                    Content Loading
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan="4" className="text-center py-12 text-slate-400">
                    Failed to Load Content{" "}
                  </td>
                </tr>
              ) : (
                data?.data?.map((data) => (
                  <tr key={data.id}>
                    <td> {new Date(data.date).toLocaleDateString()}</td>

                    <td>
                      {data.check_in
                        ? new Date(data.check_in).toLocaleTimeString()
                        : "-"}
                    </td>
                    <td>
                      {data.check_out
                        ? new Date(data.check_out).toLocaleTimeString()
                        : "-"}
                    </td>

                    <td>{data.workinghour}</td>
                    <td>{data.daytype}</td>
                    <td>{data.status}</td>
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

export default Attendance;
