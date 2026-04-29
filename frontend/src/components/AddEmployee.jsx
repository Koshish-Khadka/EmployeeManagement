import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import api from "../axios/axios";

const AddEmployee = ({ close, title, subtitle }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createEmployee = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/employees/createemployee", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Employee added successfully");
      close();
    },
    onError: () => {
      toast.error("Failed to add employee");
    },
  });

  const onSubmit = (data) => {
    createEmployee.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      position: data.position,
      department: data.department,
      basicSalary: data.basicSalary,
      allowances: data.allowances,
      deductions: data.deductions,
      password: data.password,
      role: data.role,
      bio: data.bio,
      joinDate: data.joinDate,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-xl md:max-w-3xl max-h-[85vh] overflow-y-auto p-6">
      <div className="flex justify-between items-center p-3">
        <div>
          <h2 className="text-xl font-medium mb-2">{title}</h2>
          <p className="text-sm text-gray-600"> {subtitle}</p>
        </div>
        <button className="hover:bg-slate-200 p-2 rounded-2xl " onClick={close}>
          <X />
        </button>
      </div>
      {/* forms */}
      <form
        className="space-y-6 mt-4 animate-fade-in"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="border rounded-lg border-gray-200 mt-6">
          <div className="p-6">
            <h2 className="font-medium mb-6 pb-4 border-b border-slate-100">
              Personal Infromation
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName", { required: true })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm">
                    First name is required
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName", { required: true })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm">
                    Last name is required
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">
                    Phone number is required
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Join Date
                </label>
                <input
                  type="date"
                  id="joinDate"
                  {...register("joinDate")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2 grid-span-2"
                >
                  Bio
                </label>
                <textarea
                  type="text"
                  id="bio"
                  {...register("bio")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.bio && (
                  <span className="text-red-500 text-sm">Bio is required</span>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* employement details */}
        <div className="border rounded-lg border-gray-200 mt-6">
          <div className="p-6">
            <h2 className="font-medium mb-6 pb-4 border-b border-slate-100">
              Employment Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Department
                </label>
                <select
                  id="department"
                  {...register("department")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Department</option>
                  <option value="hr">Human Resources</option>
                  <option value="engineering">Engineering</option>
                  <option value="sales">Sales</option>
                </select>
                {errors.department && (
                  <span className="text-red-500 text-sm">
                    Select employee department
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  {...register("position")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.position && (
                  <span className="text-red-500 text-sm">
                    employee position required
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Basic Salary
                </label>
                <input
                  type="number"
                  id="basicSalary"
                  defaultValue={0}
                  {...register("basicSalary")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Allowances
                </label>
                <input
                  type="number"
                  id="allowances"
                  defaultValue={0}
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
                  type="number"
                  id="deductions"
                  defaultValue={0}
                  {...register("deductions")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
        {/* account setup */}
        <div className="border rounded-lg border-gray-200 mt-6">
          <div className="p-6">
            <h2 className="font-medium mb-6 pb-4 border-b border-slate-100">
              Account setup
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
              <div>
                <label
                  htmlFor="workEmail"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Work Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    Assign email for employee
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="temporaryPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Temporary Password
                </label>
                <input
                  type="text"
                  id="password"
                  {...register("password", { required: true })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    Assign password for employee
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Role
                </label>
                <select
                  id="role"
                  {...register("role", { required: true })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="EMPLOYEE">Employee</option>
                </select>
                {errors.role && (
                  <span className="text-red-500 text-sm">
                    Assign role for employee
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* success message */}
      <div className="flex justify-end items-center gap-x-3 mt-6">
        <button
          className="flex justify-center items-center gap-x-3 border w-full py-2 mt-5 rounded-lg md:w-fit md:mt-0 hover:bg-gray-200 transition-all duration-150 md:px-4"
          onClick={close}
        >
          Cancel
        </button>
        <button
          type="button"
          className="flex justify-center items-center gap-x-3 border w-full py-2 mt-5 rounded-lg bg-blue-700 text-white md:w-fit md:mt-0 hover:bg-blue-800 transition-all duration-150 md:px-4"
          onClick={handleSubmit(onSubmit)}
        >
          Create Employee
        </button>
      </div>
    </div>
  );
};

export default AddEmployee;
