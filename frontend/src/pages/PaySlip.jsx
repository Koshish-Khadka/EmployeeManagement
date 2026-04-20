import { Plus, X } from "lucide-react";
import React from "react";

const PaySlip = () => {
  const role = "admin";
  const [payslipmodal, setPayslipModal] = React.useState(false);

  if (role === "admin") {
    return (
      <>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-medium mb-2">Payslips</h1>
            <p className="text-sm text-gray-600 ">
              Generate and manage employee payslips.
            </p>
          </div>
          <button
            onClick={() => setPayslipModal(true)}
            className="flex justify-center items-center gap-x-3 border w-full py-2 mt-5 rounded-lg bg-blue-700 text-white md:w-fit md:mt-0 hover:bg-blue-800 transition-all duration-150 md:px-4"
          >
            <Plus color="white" className="h-4 w-4" />
            <span className="text-sm">Generate Payslip</span>
          </button>
        </div>

        {/* Modal */}
        {payslipmodal && (
          // <div className="bg-black/30 backdrop-blur-sm">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4 sm:p-6">
            {/* <div className="w-full m-auto max-w-sm sm:max-w-xl md:max-w-3xl max-h-[85vh] overflow-y-auto bg-white rounded-lg"> */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-xl md:max-w-3xl max-h-[85vh] overflow-y-auto p-6">
              <div className="flex  justify-between items-center p-3">
                <div>
                  <h2 className="text-xl font-medium mb-2">PaySlip</h2>
                  <p className="text-sm text-gray-600">
                    Generate Monthly Payslip
                  </p>
                </div>
                <button
                  className="hover:bg-slate-200 p-2 rounded-2xl "
                  onClick={() => setPayslipModal(false)}
                >
                  <X />
                </button>
              </div>
              <form className="p-6 pt-0 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Employee
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Basic Salary
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
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
