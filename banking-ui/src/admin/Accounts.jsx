import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Accounts() {

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    api.get("/admin/accounts")
      .then(res => setAccounts(res.data))
      .catch(() => alert("Error loading accounts"));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Accounts</h1>

      <table className="w-full bg-white shadow rounded-xl">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Account Number</th>
            <th className="p-3 text-left">Balance</th>
            <th className="p-3 text-left">Owner</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(acc => (
            <tr key={acc.id} className="border-t">
              <td className="p-3">{acc.accountNumber}</td>
              <td className="p-3">₹ {acc.balance}</td>
              <td className="p-3">{acc.user?.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}