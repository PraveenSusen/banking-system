import { useState } from "react";
import api from "../api/axios";

export default function Transfer() {

  const [toAcc, setToAcc] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = async (e) => {
    e.preventDefault();

    try {
      await api.post("/accounts/transfer", {
        toAcc,
        amount: parseFloat(amount),
      });

      alert("Transfer Successful ✅");
      setToAcc("");
      setAmount("");

    } catch (err) {
      alert(err.response?.data || "Transfer failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <form
        onSubmit={handleTransfer}
        className="bg-white p-8 rounded-2xl shadow-xl w-96 space-y-6"
      >
        <h2 className="text-2xl font-bold text-slate-700">
          Transfer Money
        </h2>

        <input
          type="text"
          placeholder="Destination Account Number"
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-500"
          value={toAcc}
          onChange={(e) => setToAcc(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Enter Amount"
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-500"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
        >
          Transfer
        </button>
      </form>
    </div>
  );
}