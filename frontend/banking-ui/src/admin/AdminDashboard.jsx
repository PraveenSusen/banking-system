import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {

  const [stats, setStats] = useState({
    users: 0,
    accounts: 0,
    transactions: 0
  });

  useEffect(() => {
    async function fetchData() {
      const users = await api.get("/admin/users");
      const accounts = await api.get("/admin/accounts");
      const transactions = await api.get("/admin/transactions");

      setStats({
        users: users.data.length,
        accounts: accounts.data.length,
        transactions: transactions.data.length
      });
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold">{stats.users}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Accounts</h3>
          <p className="text-2xl font-bold">{stats.accounts}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Transactions</h3>
          <p className="text-2xl font-bold">{stats.transactions}</p>
        </div>

      </div>
    </div>
  );
}