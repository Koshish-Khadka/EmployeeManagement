import { Navigate, useNavigate } from "react-router-dom";
import LoginLeftBanner from "../components/LoginLeftBanner";
import { MoveRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

const LoginLanding = () => {
  const naviagate = useNavigate();
  const { loading, user } = useAuth();
  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <LoginLeftBanner />
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto min-h-screen">
        <div className="w-full max-w-md animate-fade-in relative z-10">
          {/* {Header} */}
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-medium text-black  leading-tight mb-3">
              Welcome Back
            </h2>
            <p className="text-lg max-w-lg leading-relaxed text-slate-500">
              Select your portal to securely access the system
            </p>
          </div>
          {/* Portal list  */}
          <div className="space-y-4">
            <button
              className="flex border border-slate-200 rounded-md p-5 sm:p-6 w-full justify-between hover:border-indigo-500 hover:bg-indigo-50"
              onClick={() => naviagate("/login/admin")}
            >
              <h3 className="text-lg text-slate-800 group-hover:text-indigo-600 mb-1 transition-colors">
                Admin Portal
              </h3>
              <div>
                <MoveRight className="w-4 h-4" />
              </div>
            </button>
            <button
              className="flex border border-slate-200 rounded-md p-5 sm:p-6 w-full justify-between hover:border-indigo-500 hover:bg-indigo-50"
              onClick={() => naviagate("/login/employee")}
            >
              <h3 className="text-lg text-slate-800 group-hover:text-indigo-600 mb-1 transition-colors">
                Employee Portal
              </h3>
              <div>
                <MoveRight className="w-4 h-4" />
              </div>
            </button>
          </div>
          {/* footer */}
          <p className="text-sm text-slate-400 mt-8">
            {new Date().getFullYear()} KoshishCo. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginLanding;
