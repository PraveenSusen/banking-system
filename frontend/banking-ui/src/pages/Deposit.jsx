import { useState } from "react";
import api from "../api/axios";

export default function Deposit() {

  const [amount, setAmount] = useState("");

  const handleDeposit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/accounts/deposit", {
        amount: parseFloat(amount),
      });

      alert("Deposit Successful ✅");
      setAmount("");

    } catch (err) {
      alert(err.response?.data || "Deposit failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <form
        onSubmit={handleDeposit}
        className="bg-white p-8 rounded-2xl shadow-xl w-96 space-y-6"
      >
        <h2 className="text-2xl font-bold text-slate-700">
          Deposit Money
        </h2>

        <input
          type="number"
          placeholder="Enter Amount"
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Deposit
        </button>
      </form>
    </div>
  );
}