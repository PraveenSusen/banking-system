import { NavLink } from "react-router-dom";
import { LayoutDashboard, ArrowDownCircle, ArrowUpCircle, Repeat, List } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col p-6">

      <h1 className="text-2xl font-bold mb-10 tracking-wide">
        FinBank
      </h1>

      <nav className="flex flex-col gap-4">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl transition ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-800 text-slate-300"
            }`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/deposit"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl transition ${
              isActive
                ? "bg-green-600"
                : "hover:bg-slate-800 text-slate-300"
            }`
          }
        >
          <ArrowDownCircle size={20} />
          Deposit
        </NavLink>

        <NavLink
          to="/transfer"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl transition ${
              isActive
                ? "bg-purple-600"
                : "hover:bg-slate-800 text-slate-300"
            }`
          }
        >
          <Repeat size={20} />
          Transfer
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl transition ${
              isActive
                ? "bg-yellow-600"
                : "hover:bg-slate-800 text-slate-300"
            }`
          }
        >
          <List size={20} />
          Transactions
        </NavLink>

      </nav>
    </div>
  );
}