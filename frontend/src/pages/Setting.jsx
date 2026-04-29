import { useQuery } from "@tanstack/react-query";
import { Lock, Save, User } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../axios/axios";
import ChangePassword from "../components/ChangePassword";
const Setting = () => {
  const [passwordModal, setPasswordModal] = useState(false);

  const { data, isError } = useQuery({
    queryKey: ["getProfile"],
    queryFn: async () => {
      const response = await api.get("/profile");
      return response.data;
    },
  });

  console.log(data);
  if (isError) {
    return toast.error("Failed to fetch profile data. Please try again later.");
  }
  return (
    <div>
      {" "}
      <div className="mb-6">
        <h1 className="text-2xl font-medium mb-2">Settings</h1>
        <p className="text-sm text-gray-600">Manage your account settings</p>
      </div>
      {/* form */}
      <div className="border rounded-lg border-gray-200">
        <div className=" p-5">
          <div className="flex items-center gap-x-2 mb-4 border-b border-gray-200 pb-4">
            <User className="h-5 w-5 text-gray-400" />
            <h2>Public Profile</h2>
          </div>

          <form action="" className="mt-7 md:grid md:grid-cols-2 md:gap-x-4">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Name
              </label>
              <input
                type="name"
                id="name"
                required
                placeholder="Hari"
                className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                placeholder="hari123@gmail.com"
                className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="mb-4 md:col-span-2">
              <label
                htmlFor="position"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Position
              </label>
              <input
                type="text"
                id="position"
                required
                placeholder="Software Engineer"
                className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="mb-4 md:col-span-2">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Bio
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about yourself"
                className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <p className="text-[11px] text-slate-400">
                This will be displayed on your profile.
              </p>
            </div>
            <div className="mt-4 flex md:justify-end md:col-span-2">
              <button
                type="submit"
                className="border px-4 py-2 w-full md:w-fit flex justify-center items-center gap-x-4 rounded-xl bg-blue-600 text-white hover:bg-blue-800 transition-colors "
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Change password */}
      <div className="border rounded-lg sm:w-full md:w-fit border-gray-200 mt-8">
        <div className="p-5 flex items-center gap-x-4 ">
          <div className=" p-2 rounded-full bg-slate-100 ">
            <Lock className="h-5 w-5 text-gray-700" />
          </div>
          <div>
            <p>Password</p>
            <p className="text-[12px] text-slate-400">
              Update your account password.
            </p>
          </div>
          <div>
            <button
              className="border px-2 py-1 rounded-md border-slate-200 text-slate-600"
              onClick={() => setPasswordModal(true)}
            >
              Change
            </button>
          </div>
        </div>
      </div>
      {/* Password modal */}
      {passwordModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <ChangePassword onClose={() => setPasswordModal(false)} />
        </div>
      )}
    </div>
  );
};

export default Setting;
