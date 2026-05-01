import { useMutation } from "@tanstack/react-query";
import { Lock, X } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../axios/axios";

const ChangePassword = ({ onClose }) => {
  const { register, reset, handleSubmit } = useForm();

  const changePassword = useMutation({
    mutationFn: async (data) => {
      const response = await api.patch("/auth/change-password", data);
      if (response.data?.error) {
        throw new Error(response.data.error);
      }
      return response.data;
    },
    onSuccess: () => {
      toast.success("Change Password Successfully");
      reset({
        currentPassword: "",
        newPassword: "",
      });
      onClose();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });

  const onSubmit = (data) => {
    changePassword.mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in max-h-[85vh] overflow-y-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-x-2">
          <Lock className="w-4 h-4" />
          <h2 className="font-medium">Change Password</h2>
        </div>
        <button
          className="hover:bg-slate-100 transition-colors duration-75 p-2 rounded-2xl "
          onClick={onClose}
        >
          <X className="h-6 w-6" color="gray" />
        </button>
      </div>
      {/* forms */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="" className="text-sm font-medium text-slate-700 ">
            Current Password
          </label>

          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
            {...register("currentPassword", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="" className="text-sm font-medium text-slate-700">
            New Password
          </label>

          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
            {...register("newPassword", { required: true })}
          />
        </div>
        <div className="flex gap-x-3">
          <button
            className="flex justify-center items-center gap-x-3 border border-gray-200 w-full py-2 mt-5 rounded-lg hover:bg-gray-200 transition-all duration-150 md:px-4"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            // onClick={handleSubmit(onSubmit)}
            type="submit"
            className="flex justify-center items-center gap-x-3 border w-full py-2 mt-5 rounded-lg bg-blue-700 text-white  hover:bg-blue-800 transition-all duration-150 md:px-4"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
