import { X } from "lucide-react";
import React from "react";
import api from "../axios/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Loading from "./Loading";

const PaySlipForm = ({ onClose }) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await api.get("/employees/allemployee");
      return response.data.data;
    },
  });
  const { register, handleSubmit } = useForm();

  const createPaySlip = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/payslip", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Payslip created successfully");
      onClose();
    },
    onError: (error) => {
      //   toast.error("Failed to create paylsip");
      console.log(error.response?.data);
      toast.error(error.response?.data?.error || "Failed to create payslip");
    },
  });

  const onSubmit = (data) => {
    createPaySlip.mutate({
      employeeId: data.employeeId,
      month: data.month,
      year: data.year,
      basicSalary: data.basicSalary,
      allowances: data.allowances,
      deductions: data.deductions,
    });
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return toast.error("Failed to fetch employees. Please try again later.");
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg  max-h-[85vh] overflow-y-auto p-4">
      <div className="flex  justify-between items-center p-3">
        <div>
          <h2 className="text-xl font-medium mb-2">PaySlip</h2>
          <p className="text-sm text-gray-600">Generate Monthly Payslip</p>
        </div>
        <button
          className="hover:bg-slate-200 p-2 rounded-2xl "
          onClick={onClose}
        >
          <X />
        </button>
      </div>
      <form className="p-6 pt-0 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
         */}
        <div className="grid grid-cols-2 gap-5 text-sm text-slate-700">
          <div className="grid col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Employee
            </label>
            <select name="employee" id="employe" {...register("employeeId")}>
              <option value="">Select Employee</option>
              {data.map((element) => {
                return (
                  <React.Fragment key={element.id}>
                    <option value={element.id}>{element.firstname}</option>
                  </React.Fragment>
                );
              })}
            </select>
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Month
            </label>
            <input
              type="number"
              defaultValue={1}
              id="name"
              {...register("month")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Year
            </label>
            <input
              type=""
              id="name"
              {...register("year")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Basic Salary
            </label>
            <input type="number" {...register("basicSalary")} />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Allowances
            </label>
            <input
              type="text"
              id="name"
              {...register("allowances")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Deductions
            </label>
            <input
              type="text"
              id="name"
              {...register("deductions")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end items-end gap-x-3">
          <button className="flex justify-center items-center gap-x-3 border border-gray-200  py-2 mt-5 rounded-lg hover:bg-gray-200 transition-all duration-150 md:px-4">
            Cancel
          </button>
          <button
            type="submit"
            className="flex justify-center items-center gap-x-3 border  py-2 mt-5 rounded-lg bg-green-700 text-white  hover:bg-green-800 transition-all duration-150 md:px-4"
          >
            Generate
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaySlipForm;
