import { NavLink } from "react-router-dom";
import { LayoutDashboard, ArrowDownCircle, ArrowUpCircle, Repeat, History, LogOut, Shield } from "lucide-react";
import { getUserRole } from "../utils/decodeToken";

export default function Layout({ children }) {

  const role = getUserRole();

  
  
  const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.replace("/login");
};

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">

        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-8">
            Banking System
          </h2>

          <nav className="space-y-4">

            <NavLink to="/" className="flex items-center gap-3 hover:text-blue-600">
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>

            <NavLink to="/deposit" className="flex items-center gap-3 hover:text-green-600">
              <ArrowDownCircle size={20} />
              Deposit
            </NavLink>

            <NavLink to="/withdraw" className="flex items-center gap-3 hover:text-red-600">
              <ArrowUpCircle size={20} />
              Withdraw
            </NavLink>

            <NavLink to="/transfer" className="flex items-center gap-3 hover:text-purple-600">
              <Repeat size={20} />
              Transfer
            </NavLink>

            <NavLink to="/transactions" className="flex items-center gap-3 hover:text-indigo-600">
              <History size={20} />
              Transactions
            </NavLink>

            {/* 👑 ADMIN LINK (Only visible for ADMIN) */}
            {role === "ADMIN" && (
              <NavLink to="/admin" className="flex items-center gap-3 hover:text-yellow-600">
                <Shield size={20} />
                Admin Panel
              </NavLink>
            )}

          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-600 hover:text-red-800 mt-10"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        {children}
      </div>

    </div>
  );
}