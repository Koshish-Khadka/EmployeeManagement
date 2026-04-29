import { Download, Plus, X } from "lucide-react";
import React from "react";
import { useAuth } from "../context/AuthContext";
import PaySlipForm from "../components/PaySlipForm";
import { useQuery } from "@tanstack/react-query";
import api from "../axios/axios";
import toast from "react-hot-toast";

const PaySlip = () => {
  const { user } = useAuth();

  const [payslipmodal, setPayslipModal] = React.useState(false);

  // get all created payslip
  const { data, isError, isLoading } = useQuery({
    queryKey: ["getPayslip"],
    queryFn: async () => {
      const response = await api.get("/payslip");
      return response.data;
    },
  });
  if (isError) {
    toast.error("Failed to fetch payslip");
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 overflow-auto">
        <div>
          <h1 className="text-2xl font-medium mb-2">Payslips</h1>
          <p className="text-sm text-gray-600 ">
            Generate and manage employee payslips.
          </p>
        </div>
        {user.role !== "ADMIN" && (
          <button
            onClick={() => setPayslipModal(true)}
            className="flex justify-center items-center gap-x-3 border w-full py-2 mt-5 rounded-lg bg-blue-700 text-white md:w-fit md:mt-0 hover:bg-blue-800 transition-all duration-150 md:px-4"
          >
            <Plus color="white" className="h-4 w-4" />
            <span className="text-sm">Generate Payslip</span>
          </button>
        )}
      </div>
      {/* table */}
      <div className="card overflow-hidden mt-8">
        <div className="overflow-x-hidden">
          <table className="table-modern">
            <thead>
              <tr>
                {user.role === "ADMIN" && <th>EMPLOYEE</th>}
                <th>PERIOD</th>
                <th>BASIC SALARY</th>
                <th>NET SALARY</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="text-center py-12 text-slate-400">
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
                  <td colSpan="4" className="text-center py-12 text-slate-400">
                    No leave applications found
                  </td>
                </tr>
              ) : (
                data?.data?.map((data) => (
                  <tr key={data.id}>
                    <td>{data.employee.name}</td>

                    <td>
                      {data.year},{data.month}
                    </td>

                    <td>{data.basicsalary}</td>
                    <td>{data.netsalary}</td>

                    <td>
                      <button className="flex items-center gap-x-2 border p-2 rounded-md border-gray-200 hover:bg-gray-100 transition-colors duration-100">
                        <Download className="w-4 h-4" />
                        <a href="">download</a>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {payslipmodal && (
        // <div className="bg-black/30 backdrop-blur-sm">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4 sm:p-6">
          {/* <div className="w-full m-auto max-w-sm sm:max-w-xl md:max-w-3xl max-h-[85vh] overflow-y-auto bg-white rounded-lg"> */}
          <PaySlipForm onClose={() => setPayslipModal(false)} />
        </div>
      )}
    </>
  );
};

// return (
//   <>
//     <div>
//       <h1 className="text-2xl font-medium mb-2">Payslips</h1>
//       <p className="text-sm text-gray-600 ">Your payslip history</p>
//     </div>
//     {/* table */}
//     <div className="card overflow-hidden mt-8">
//       <div className="overflow-x-hidden">
//         <table className="table-modern">
//           <thead>
//             <tr>
//               <th>PERIOD</th>
//               <th>BASIC SALARY</th>
//               <th>NET SALARY</th>
//               <th>ACTIONS</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td colSpan="4" className="text-center py-12 text-slate-400">
//                 No data found
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </>
// );
// };

export default PaySlip;
