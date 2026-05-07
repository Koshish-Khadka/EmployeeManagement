import { useQuery } from "@tanstack/react-query";
import React from "react";
import api from "../axios/axios";
import { useParams } from "react-router-dom";
import Loading from "../components/Loaders/Loading";
import toast from "react-hot-toast";

const PrintPaySlip = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getPaySlipById", id],
    queryFn: async () => {
      const response = await api.get(`/payslip/${id}`);
      return response.data;
    },
  });

  const handlePrint = () => {
    window.print();
  };
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    toast.error("Failed to do this operation, Try again later");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 print:shadow-none print:rounded-none print:p-0">
        {/* Header */}
        <div className="text-center border-b border-slate-200 pb-6">
          <h1 className="text-2xl font-bold tracking-wide">PAYSLIP</h1>
          <p className="text-gray-500 mt-1">January 2026</p>
        </div>
        {/* Employee Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 my-6">
          <div>
            <p className="text-xs text-gray-500 uppercase">Employee Name</p>
            <p className="font-semibold text-lg">{data.employee.name}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase">Position</p>
            <p className="font-semibold text-lg">{data.employee.position}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase">Email</p>
            <p className="font-semibold">{data.employee.email}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase">Period</p>
            <p className="font-semibold">{data.year}</p>
          </div>
        </div>

        {/* Salary Table */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="grid grid-cols-2 bg-gray-50 p-4 font-semibold text-gray-600 text-sm">
            <div>Description</div>
            <div className="text-right">Amount</div>
          </div>

          <div className="">
            <div className="grid grid-cols-2 p-4">
              <div>Basic Salary</div>
              <div className="text-right">${data.basicsalary}</div>
            </div>

            <div className="grid grid-cols-2 p-4">
              <div>Allowances</div>
              <div className="text-right">+${data.allowances}</div>
            </div>

            <div className="grid grid-cols-2 p-4">
              <div>Deductions</div>
              <div className="text-right">-${data.deductions}</div>
            </div>

            <div className="grid grid-cols-2 p-4 font-bold bg-gray-50">
              <div>Net Salary</div>
              <div className="text-right">${data.netsalary}</div>
            </div>
          </div>
        </div>

        {/* Print Button */}
        <div className="flex justify-center mt-8 print:hidden">
          <button
            onClick={handlePrint}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Print Payslip
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintPaySlip;
