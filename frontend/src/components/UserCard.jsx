import React from "react";
import AddEmployee from "./AddEmployee";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../axios/axios";
import { PencilIcon, Trash2 } from "lucide-react";

const UserCard = ({ employee }) => {
  const [editMode, setEditMode] = React.useState(false);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Do you really want to delete this employee?",
    );

    if (confirmDelete) {
      deleteEmployee.mutate(id);
    }
  };

  // delete user function
  const deleteEmployee = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await api.put(`/employees/deleteemployee`, { id });
        if (response.status === 200) {
          toast.success("Employee deleted successfully");
        } else {
          toast.error("Failed to delete employee. Please try again later.");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete employee. Please try again later.");
      }
    },
  });

  // const deleteUser = () => {
  //   alert("User Deleted");
  // };

  const firstChar = employee.firstname?.[0]?.toUpperCase();

  return (
    <>
      <div className="relative border group border-slate-200 rounded-lg transition-all hover:-translate-y-1 duration-300">
        {/* Overlay (hidden by default) */}
        {employee.employment_status === "active" && (
          <div className="absolute inset-0 bg-blue-800/20 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
            <button
              onClick={() => setEditMode(true)}
              className=" bg-white px-2  py-2 text-sm text-black rounded-lg transition-all hover:text-blue-500 hover:scale-105 duration-200 ease-in-out"
            >
              <PencilIcon className="w-5 h-5" />
            </button>

            <button
              // onClick={() => deleteEmployee.mutate(employee.id)}
              onClick={() => handleDelete(employee.id)}
              className="px-2 py-2 text-sm bg-white text-black rounded-lg transition-all  hover:text-red-500 hover:scale-105 duration-200 ease-in-out "
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="w-full relative h-52  bg-slate-100 rounded-t-lg">
          <span className="absolute top-3 left-3 text-xs font-medium bg-white px-3 py-1 rounded-xl shadow">
            {employee.department}
          </span>
          {employee.employment_status !== "active" && (
            <>
              <span className="absolute top-3 right-3 text-xs font-medium bg-red-400 text-white px-3 py-1 rounded-xl shadow hover:bg-red-600 cursor-pointer">
                User Deleted
              </span>
            </>
          )}

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-200 w-24 h-24 flex items-center justify-center rounded-full text-xl font-semibold text-indigo-500">
            {firstChar}
          </div>
          {/* profile image */}
        </div>
        <div className="px-4 py-5 bg-white">
          <h2 className="text-base font-semibold text-slate-800">
            {employee.firstname} {employee.lastname}
          </h2>
          <p className="text-gray-600 text-[12px]">{employee.position}</p>
        </div>
      </div>
      {/* edit mode content */}
      {editMode && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-3 sm:p-6 z-50"
          onClick={() => setEditMode(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AddEmployee
              title="Edit Employee"
              subtitle="Update the employee's information below."
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UserCard;
