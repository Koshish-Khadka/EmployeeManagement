import { useState } from "react";
import { Outlet } from "react-router-dom";
import { LayoutDashboard, LogOut, Menu, User, X } from "lucide-react";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const name = "koshish";

  const employeeLink = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      name: "Attendance",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      name: "Leave",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      name: "PaySlip",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      name: "Settings",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
  ];

  const pathname = window.location.pathname;

  return (
    <div className="flex h-screen relative">
      {" "}
      {!isSidebarOpen && (
        <>
          <button
            // className="p-3 border absolute top-4 left-4 rounded-xl bg-slate-900 md:hidden"
            className="md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg border border-white/10"
            onClick={() => handleSidebarToggle(true)}
          >
            <Menu color="white" className="h-5 w-5" />
          </button>
        </>
      )}
      {/* mobile slider */}
      {isSidebarOpen && (
        <>
          <div className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"></div>
          <aside className="md:hidden fixed inset-y-0 left-0 w-72 bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white z-50 flex flex-col transform transition-transform duration-300 translate-x-0">
            {/* <Sidebar /> */}
            <div className="px-5 pt-6 pb-5 border-b border-white/6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User />
                  <div>
                    <p className="font-semibold text-[13px] text-white tracking-wide">
                      Koshish Khadka
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Management System
                    </p>
                  </div>
                </div>
                <button className="lg:hidden text-slate-400 hover:text-white p-1">
                  <X color="white" onClick={() => handleSidebarToggle(false)} />
                </button>
              </div>
            </div>
            <div className="mx-3 mt-4 mb-1 p-3 rounded-lg bg-white/3 border border-white/4">
              <div className="flex items-center gap-3">
                <button className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center ring-1 ring-white/10 shrink-0">
                  {name[0]}
                </button>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-slate-200 truncate">
                    {name}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    Employee
                  </p>
                </div>
              </div>
            </div>
            <div className="px-5 pt-5 pb-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                Navigation
              </p>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 px-3 space-y-1 overflow-y-auto">
              {employeeLink.map((link, index) => (
                <a
                  key={index}
                  href={`/${link.name.toLowerCase()}`}
                  className={`group flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-all duration-150 relative ${pathname === `/${link.name.toLowerCase()}` ? "bg-indigo-500/12 text-indigo-300" : "text-slate-400 hover:text-white hover:bg-slate-700"}`}
                >
                  {link.icon}
                  <span className="flex-1">{link.name}</span>
                </a>
              ))}
            </div>

            {/* logout */}
            <div className="p-3 border-t border-white/6">
              <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-[13px] font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/8 transition-all duration-150">
                <LogOut />
                <span>Logout</span>
              </button>
            </div>
          </aside>
        </>
      )}
      {/* desktop sidebar */}
      {/* <Sidebar /> */}
      <aside className="hidden w-64 h-ful md:flex  flex-col bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white">
        <div className="px-5 pt-6 pb-5 border-b border-white/6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="h-7 w-7" />
              <div>
                <p className="font-semibold text-[13px] text-white tracking-wide">
                  Koshish Khadka
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  Management System
                </p>
              </div>
            </div>
            <button className="lg:hidden text-slate-400 hover:text-white p-1">
              <X color="white" onClick={() => handleSidebarToggle(false)} />
            </button>
          </div>
        </div>
        <div className="mx-3 mt-4 mb-1 p-3 rounded-lg bg-white/3 border border-white/4">
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center ring-1 ring-white/10 shrink-0">
              {name[0]}
            </button>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-slate-200 truncate">
                {name}
              </p>
              <p className="text-[11px] text-slate-500 truncate">Employee</p>
            </div>
          </div>
        </div>
        <div className="flex-1 px-3 space-y-1 overflow-y-auto">
          {employeeLink.map((link, index) => (
            <a
              key={index}
              href={`/${link.name.toLowerCase()}`}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-all duration-150 relative ${pathname === `/${link.name.toLowerCase()}` ? "bg-indigo-500/12 text-indigo-300" : "text-slate-400 hover:text-white hover:bg-slate-700"}`}
            >
              {link.icon}
              <span className="flex-1">{link.name}</span>
            </a>
          ))}
        </div>

        {/* logout */}
        <div className="p-3 border-t border-white/6">
          <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-[13px] font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/8 transition-all duration-150">
            <LogOut />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto ">
        <div className="p-4 pt-16 sm:p-6 lg:p-8 max-w-400 mx-auto bg-amber-50 min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
