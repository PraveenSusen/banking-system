import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminTransactions() {

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    api.get("/admin/transactions")
      .then(res => setTransactions(res.data))
      .catch(() => alert("Error loading transactions"));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Transactions</h1>

      <table className="w-full bg-white shadow rounded-xl">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Type</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Source</th>
            <th className="p-3">Destination</th>
            <th className="p-3">Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id} className="border-t text-center">
              <td className="p-3">{tx.type}</td>
              <td className="p-3">₹ {tx.amount}</td>
              <td className="p-3">{tx.sourceAccount?.accountNumber || "-"}</td>
              <td className="p-3">{tx.destinationAccount?.accountNumber || "-"}</td>
              <td className="p-3">{tx.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}