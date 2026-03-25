import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {

  const [accountNumber, setAccountNumber] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await api.post("/accounts/create", {
        accountNumber,
      });

      alert("Account Created Successfully ✅");
      navigate("/");
    } catch (err) {
      alert("Account number already exists ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">

        <h2 className="text-2xl font-bold mb-6 text-slate-700">
          Create Bank Account
        </h2>

        <form onSubmit={handleCreate} className="space-y-4">

          <input
            type="text"
            placeholder="Enter Account Number"
            className="w-full border p-3 rounded-lg"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Create Account
          </button>

        </form>

      </div>

    </div>
  );
}