import { useMutation  } from "@tanstack/react-query";
import { CalendarDays, File, X } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import api from "../axios/axios";
import toast from "react-hot-toast";

const LeaveForm = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createLeave = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/leave", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Leave created successfully");
      onclose();
    },
    onError: () => {
      toast.error("Failed to create leave");
    },
  });

  const onSubmit = (data) => {
    createLeave.mutate({
      leaveType: data.leaveType,
      startDate: data.startDate,
      endDate: data.endDate,
      reason: data.reason,
    });
  };



  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in max-h-[85vh] overflow-y-auto p-6">
      <div className="p-3">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h2 className="text-lg font-medium mb-1">Apply for Leave</h2>
            <p className="text-sm text-slate-400">
              Submit your leave request here.
            </p>
          </div>
          <button
            className="hover:bg-slate-100 transition-colors duration-75 p-2 rounded-2xl "
            onClick={onClose}
          >
            <X className="h-6 w-6" color="gray" />
          </button>
        </div>
        <form
          action=""
          className="py-6 space-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="flex gap-x-3 items-center">
              <File className="w-4 h-4" color="gray" />
              <label
                htmlFor=""
                className="text-sm font-medium text-slate-700 mb-2"
              >
                Leave Type
              </label>
            </div>
            <select
              name="leaveType"
              id="leaveType"
              defaultValue="Sick Leave"
              className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("leaveType", { required: true })}
            >
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
            {errors.leaveType && (
              <span className="text-red-500 text-sm">
                leaveType is required
              </span>
            )}
          </div>
          <div>
            <div className="flex gap-x-3 items-center">
              <CalendarDays className="w-4 h-4" color="gray" />
              <label
                htmlFor=""
                className="text-sm font-medium text-slate-700 mb-2"
              >
                Duration
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="" className="text-sm text-slate-400">
                  From
                </label>
                <input
                  type="date"
                  className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("startDate", { required: true })}
                />
                {errors.startDate && (
                  <span className="text-red-500 text-sm">
                    startDate is required
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="" className="text-sm text-slate-400 ">
                  To
                </label>
                <input
                  type="date"
                  className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("endDate", { required: true })}
                />
                {errors.endDate && (
                  <span className="text-red-500 text-sm">
                    endDate is required
                  </span>
                )}
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className="text-sm font-medium text-slate-700 mb-2"
            >
              Reason
            </label>

            <textarea
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 "
              {...register("reason", { required: true })}
            />
            {errors.reason && (
              <span className="text-red-500 text-sm">reason is required</span>
            )}
          </div>
        </form>
        <div className="flex gap-x-3">
          <button
            className="flex justify-center items-center gap-x-3 border border-gray-200 w-full py-2 mt-5 rounded-lg hover:bg-gray-200 transition-all duration-150 md:px-4"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="flex justify-center items-center gap-x-3 border w-full py-2 mt-5 rounded-lg bg-blue-700 text-white  hover:bg-blue-800 transition-all duration-150 md:px-4"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveForm;
