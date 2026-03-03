import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, LogOut, ArrowLeft } from "lucide-react";

export default function AdminLayout({ children }) {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.replace("/login"); // ✅ No white screen
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 flex flex-col justify-between">

        <div>
          <h2 className="text-2xl font-bold mb-8">
            Admin Panel
          </h2>

          <nav className="space-y-4">

            <NavLink
              to="/admin"
              className="flex items-center gap-3 hover:text-gray-300"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/users"
              className="flex items-center gap-3 hover:text-gray-300"
            >
              <Users size={20} />
              Users
            </NavLink>

            
            <NavLink to="/admin/accounts" className="block hover:text-gray-300">
  Accounts
</NavLink>

<NavLink to="/admin/transactions" className="block hover:text-gray-300">
  Transactions
</NavLink>

          </nav>
          
        </div>

        {/* Bottom Section */}
        <div className="space-y-4">

          {/* Back to Main App */}
          <NavLink
            to="/dashboard"
            className="flex items-center gap-3 hover:text-gray-300"
          >
            <ArrowLeft size={20} />
            Back to Banking
          </NavLink>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-400 hover:text-red-600"
          >
            <LogOut size={20} />
            Logout
          </button>

        </div>

      </div>

      {/* Content Area */}
      <div className="flex-1 p-10">
        {children}
      </div>

    </div>
  );
}