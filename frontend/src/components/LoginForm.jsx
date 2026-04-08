import React from "react";
import LoginLeftBanner from "./LoginLeftBanner";
import { MoveLeft } from "lucide-react";

const LoginForm = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <LoginLeftBanner />
      <div className=" flex flex-1 justify-center items-center p-6 sm:p-12 md:w-1/2">
        <div className="w-full max-w-md animate-fade-in ">
          <a
            href="/login"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm mb-10 transition-colors"
          >
            <MoveLeft className="h-6 w-6" />
            <p>Back to portal </p>
          </a>
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-medium text-zinc-800 mb-2">
              Admin Portal
            </h1>
            <p className="text-sm sm:text-base text-slate-500">
              Sign in to manage the organization
            </p>
          </div>
          <form action="" className="space-y-5">
            <div>
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
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="border p-2 w-full rounded-xl bg-blue-600 text-white hover:bg-blue-800 transition-colors "
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
