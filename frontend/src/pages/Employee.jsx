import { Plus, Search, X } from "lucide-react";
import React, { useState } from "react";
import UserCard from "../components/UserCard";
import AddEmployee from "../components/AddEmployee";

const Employee = () => {
  const employees = [1, 2, 3, 4, 5];
  const [addEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);

  return (
    <>
      {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center"> */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        {/* </div> */}
        <div>
          <h1 className="text-2xl font-medium mb-2">Employees</h1>
          <p className="text-sm text-gray-600 ">Manage your employees here.</p>
        </div>

        <button
          onClick={() => setAddEmployeeModalOpen(true)}
          className="flex justify-center items-center gap-x-3 border w-full py-2 mt-5 rounded-lg bg-blue-700 text-white md:w-fit md:mt-0 hover:bg-blue-800 transition-all duration-150 md:px-4"
        >
          <Plus color="white" className="h-4 w-4" />
          <span className="text-sm">Add Employee</span>
        </button>
      </div>
      {/* search bar */}
      <div className="mt-4 flex flex-col md:flex-row md:gap-x-4">
        <input
          type="text"
          placeholder="Search employees..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="department"
          id="department"
          className="w-fit border border-gray-300 rounded-lg px-4 py-2 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Departments</option>
          <option value="hr">Human Resources</option>
          <option value="it">Information Technology</option>
          <option value="finance">Finance</option>
        </select>
      </div>
      {/* Card */}
      <div className="mt-8 flex flex-col gap-y-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-4">
        {employees.map((employee, index) => {
          return (
            <>
              <UserCard employee={employee} index={index} />
            </>
          );
        })}
      </div>
      {addEmployeeModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 sm:p-6">
          <AddEmployee close={() => setAddEmployeeModalOpen(false)} title="Add New Employee" subtitle="Fill in the details below to add a new employee." />
        </div>
      )}
    </>
  );
};

export default Employee;
