import React from "react";
import LoginLeftBanner from "./LoginLeftBanner";
import { MoveLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import api from "../axios/axios";

const LoginForm = ({ role, title, subtitle }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async ({ email, password, role }) => {
      const { data } = await api.post("/auth/login", {
        email,
        password,
        role,
      });

      if (data?.error) {
        throw new Error(data.error);
      }

      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);

      toast.success("Login successful!");
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Login failed");
    },
  });

  const onSubmit = (formData) => {
    loginMutation.mutate({
      email: formData.email,
      password: formData.password,
      role,
    });
  };

  // const onSubmit = (data) => {
  //   try {
  //     setLoading(true);
  //     login(data.email, data.password, role);
  //     navigate("/dashboard");
  //     toast.success("Login successful!");
  //   } catch (error) {
  //     toast.error(error.message || "Login failed. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
              {title}
            </h1>
            <p className="text-sm sm:text-base text-slate-500">{subtitle}</p>
          </div>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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
                {...register("email", { required: "Email is required" })}
                placeholder="hari123@gmail.com"
                className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
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
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="border p-2 w-full rounded-xl bg-blue-600 text-white hover:bg-blue-800 transition-colors "
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
