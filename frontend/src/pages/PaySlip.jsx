import { Plus } from "lucide-react";
import React from "react";

const PaySlip = () => {
  const role = "admin";

  if (role === "admin") {
    return (
      <>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-medium mb-2">Payslips</h1>
            <p className="text-sm text-gray-600 ">
              Generate and manage employee payslips.
            </p>
          </div>
          <button className="flex justify-center items-center gap-x-3 border w-full py-2 mt-5 rounded-lg bg-blue-700 text-white md:w-fit md:mt-0 hover:bg-blue-800 transition-all duration-150 md:px-4">
            <Plus color="white" className="h-4 w-4" />
            <span className="text-sm">Generate Payslip</span>
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <h1 className="text-2xl font-medium mb-2">Payslips</h1>
        <p className="text-sm text-gray-600 ">Your payslip history</p>
      </div>
    </>
  );
};

export default PaySlip;
