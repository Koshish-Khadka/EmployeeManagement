import React from "react";
import AddEmployee from "./AddEmployee";

const UserCard = () => {
  const name = "Koshish";
  const [editMode, setEditMode] = React.useState(false);

  const deleteUser = () => {
    alert("User Deleted");
  };

  return (
    <>
      <div className="border border-slate-200 rounded-lg transition-all hover:-translate-y-1 duration-300">
        <div className="w-full relative h-52  bg-slate-100 rounded-t-lg">
          <span className="absolute top-3 left-3 text-xs font-medium bg-white px-3 py-1 rounded-xl shadow">
            Sales
          </span>
          <span
            className="absolute top-3 right-20 text-xs font-medium bg-yellow-700 text-white px-3 py-1 rounded-xl shadow hover:bg-yellow-600 cursor-pointer"
            onClick={() => setEditMode(true)}
          >
            Edit
          </span>
          <span
            className="absolute top-3 right-3 text-xs font-medium bg-red-700 text-white px-3 py-1 rounded-xl shadow hover:bg-red-600 cursor-pointer"
            onClick={deleteUser}
          >
            Delete
          </span>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-200 w-24 h-24 flex items-center justify-center rounded-full text-xl font-semibold text-indigo-500">
            {name[0]}
          </div>
          {/* profile image */}
        </div>
        <div className="px-4 py-5 bg-white">
          <h2 className="text-base font-semibold text-slate-800">
            Koshish Khadka
          </h2>
          <p className="text-gray-600 text-[12px]">Software Developer</p>
        </div>
      </div>
      {/* edit mode content */}
      {editMode && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-3 sm:p-6 z-50"
          onClick={() => setEditMode(false)} // close on outside click
        >
          <AddEmployee
            title="Edit Employee"
            subtitle="Update the employee's information below."
          />
        </div>
      )}
    </>
  );
};

export default UserCard;