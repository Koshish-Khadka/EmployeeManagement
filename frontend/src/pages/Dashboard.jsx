import {
  Building,
  Calendar,
  DollarSign,
  File,
  Files,
  FilesIcon,
  MoveRight,
  User2,
} from "lucide-react";
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (user.role === "ADMIN") {
    return (
      <div>
        <div>
          <h1 className="text-2xl font-medium mb-2">Dashboard</h1>
          <p className="text-sm text-gray-600 ">Welcome, koshish!</p>
          <p className="text-sm text-gray-600 "> {user.role}!</p>
        </div>
        <div className="mt-8 space-y-4 md:grid md:grid-cols-4 md:gap-4 md:space-y-0">
          {/* box */}
          <div className="flex justify-between items-center border border-l-4 border-l-gray-500 border-gray-200 px-5 py-5 rounded-lg transition-all hover:-translate-y-1 duration-200">
            <div className="space-y-2">
              <p>Total Employees</p>
              <p className="text-xl font-bold">20</p>
            </div>
            <button className=" p-3 rounded-full  bg-gray-100">
              <User2 className="h-5 w-5" />
            </button>
          </div>

          <div className="flex justify-between items-center border border-l-4 border-l-gray-500 border-gray-200 px-5 py-5 rounded-lg transition-all hover:-translate-y-1 duration-200">
            <div className="space-y-2">
              <p>Departments</p>
              <p className="text-xl font-bold">0</p>
            </div>
            <button className=" p-3 rounded-full  bg-gray-100">
              <Building className="h-5 w-5" />
            </button>
          </div>

          <div className="flex justify-between items-center border border-l-4 border-l-gray-500 border-gray-200 px-5 py-5 rounded-lg transition-all hover:-translate-y-1 duration-200">
            <div className="space-y-2">
              <p>Attendance</p>
              <p className="text-xl font-bold">1000</p>
            </div>
            <button className=" p-3 rounded-full  bg-gray-100">
              <Files className="h-5 w-5" />
            </button>
          </div>
          <div className="flex justify-between items-center border border-l-4 border-l-gray-500 border-gray-200 px-5 py-5 rounded-lg transition-all hover:-translate-y-1 duration-200">
            <div className="space-y-2">
              <p>Pending Leaves</p>
              <p className="text-xl font-bold">$1000</p>
            </div>
            <button className=" p-3 rounded-full  bg-gray-100">
              <FilesIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div>
        <h1 className="text-2xl font-medium mb-2">Welcome, {name}!</h1>
        <p className="text-sm text-gray-600 ">
          Software Developer- Engineering
        </p>
      </div>
      <div className="mt-8 space-y-4 md:grid md:grid-cols-3 md:gap-4 md:space-y-0">
        {/* box */}
        <div className="flex justify-between items-center border border-l-4 border-l-gray-500 border-gray-200 px-5 py-5 rounded-lg transition-all hover:-translate-y-1 duration-200">
          <div className="space-y-2">
            <p>Days Present</p>
            <p className="text-xl font-bold">20</p>
          </div>
          <button className=" p-3 rounded-full  bg-gray-100">
            <Calendar className="h-5 w-5" />
          </button>
        </div>

        <div className="flex justify-between items-center border border-l-4 border-l-gray-500 border-gray-200 px-5 py-5 rounded-lg transition-all hover:-translate-y-1 duration-200">
          <div className="space-y-2">
            <p>Pending Leaves</p>
            <p className="text-xl font-bold">0</p>
          </div>
          <button className=" p-3 rounded-full  bg-gray-100">
            <File className="h-5 w-5" />
          </button>
        </div>

        <div className="flex justify-between items-center border border-l-4 border-l-gray-500 border-gray-200 px-5 py-5 rounded-lg transition-all hover:-translate-y-1 duration-200">
          <div className="space-y-2">
            <p>Latest Payslip</p>
            <p className="text-xl font-bold">$1000</p>
          </div>
          <button className=" p-3 rounded-full  bg-gray-100">
            <DollarSign className="h-5 w-5" />
          </button>
        </div>
      </div>
      {/* attendance button */}
      {/* <div className="mt-7 flex flex-col md:flex-row gap-4 ">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          <div className="flex justify-center items-center gap-x-3">
            <p>Mark Attendance</p>
            <MoveRight />
          </div>
        </button>
        <button className="border border-gray-200 text-black py-2 px-4 rounded-md mt-2">
          <p>Apply for Leave</p>
        </button>
      </div> */}
      <div className="mt-7 flex flex-col sm:flex-row gap-3 ">
        <Link to={"/attendance"}>
          <button className="text-sm bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Mark Attendance
          </button>
        </Link>
        <Link to={"/leave"}>
          <button className="text-sm border border-gray-200 text-black py-2 px-4 rounded-md">
            Apply for Leave
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
