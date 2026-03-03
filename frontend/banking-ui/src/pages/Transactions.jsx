import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Transactions() {

  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  const fetchTransactions = async () => {
    try {
      const res = await api.get(
        `/accounts/transactions/me?page=${page}&size=5`
      );

      setTransactions(res.data.content);
      setTotalPages(res.data.totalPages);

    } catch (err) {
      console.error("Error fetching transactions");
    }
  };

  const getBadgeStyle = (type) => {
    if (type === "DEPOSIT")
      return "bg-green-100 text-green-700";
    if (type === "WITHDRAW")
      return "bg-red-100 text-red-700";
    return "bg-purple-100 text-purple-700";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatCurrency = (amount) => {
    return `₹ ${amount.toLocaleString("en-IN")}`;
  };

  return (
    <div className="p-8 space-y-8">

      <h2 className="text-3xl font-bold text-slate-700">
        Transaction History
      </h2>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr className="text-gray-600 text-sm">
              <th className="p-4">Type</th>
              <th>Amount</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((txn, index) => (
              <tr
                key={index}
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeStyle(txn.type)}`}
                  >
                    {txn.type}
                  </span>
                </td>

                <td className="font-semibold">
                  {formatCurrency(txn.amount)}
                </td>

                <td>{txn.sourceAccount || "-"}</td>
                <td>{txn.destinationAccount || "-"}</td>

                <td className="text-sm text-gray-500">
                  {formatDate(txn.timestamp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center p-6">

          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-gray-600">
            Page {page + 1} of {totalPages}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page + 1 >= totalPages}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}