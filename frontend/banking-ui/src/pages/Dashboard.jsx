import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { ArrowDown, ArrowUp, Repeat, LogOut } from "lucide-react";

export default function Dashboard() {

  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAccount();
  }, []);

  const fetchAccount = async () => {
  try {
    const res = await api.get("/accounts/me");
    setAccount(res.data);
  } catch (err) {
    if (err.response?.status === 404) {
      navigate("/create-account");
    }
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="space-y-10">

      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-700">
          Welcome, {account?.userName}
        </h1>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-10 rounded-3xl shadow-xl">

        <p className="opacity-80">Current Balance</p>

        <h2 className="text-5xl font-bold mt-2">
          ₹ {account?.balance ?? "0.00"}
        </h2>

        <p className="mt-3 opacity-80">
          Account No: {account?.accountNumber}
        </p>

      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-3 gap-8">

        <button
          onClick={() => navigate("/deposit")}
          className="bg-white p-8 rounded-2xl shadow hover:shadow-2xl transition flex flex-col items-center gap-3"
        >
          <ArrowDown className="text-green-600" size={28} />
          <span className="font-semibold">Deposit</span>
        </button>

        <button
          onClick={() => navigate("/withdraw")}
          className="bg-white p-8 rounded-2xl shadow hover:shadow-2xl transition flex flex-col items-center gap-3"
        >
          <ArrowUp className="text-red-600" size={28} />
          <span className="font-semibold">Withdraw</span>
        </button>

        <button
          onClick={() => navigate("/transfer")}
          className="bg-white p-8 rounded-2xl shadow hover:shadow-2xl transition flex flex-col items-center gap-3"
        >
          <Repeat className="text-purple-600" size={28} />
          <span className="font-semibold">Transfer</span>
        </button>

      </div>

    </div>
  );
}