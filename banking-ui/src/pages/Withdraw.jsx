import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Withdraw() {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleWithdraw = async (e) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);

    if (!parsedAmount || parsedAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      await api.post("/accounts/withdraw", {
        amount: parsedAmount,
      });

      alert("Withdraw Successful 💸");
      setAmount("");
      navigate("/dashboard");
    } catch (error) {
      alert("Withdraw Failed ❌");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-[450px]">
        <h2 className="text-2xl font-bold mb-6 text-red-600 text-center">
          Withdraw Money
        </h2>

        <form onSubmit={handleWithdraw} className="space-y-5">
          <input
            type="number"
            placeholder="Enter Amount"
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition font-semibold"
          >
            Withdraw
          </button>
        </form>
      </div>
    </div>
  );
}