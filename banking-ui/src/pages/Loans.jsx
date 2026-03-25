import { useEffect, useState } from "react";
import api from "../api/axios";
import LoanCalculator from "../components/LoanCalculator";

export default function Loans() {

  const [loans, setLoans] = useState([]);
  const [amount, setAmount] = useState(50000);
  const [tenure, setTenure] = useState(12);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    const res = await api.get("/loans/me");
    setLoans(res.data);
  };

  const applyLoan = async () => {
    await api.post("/loans/apply", {
      amount,
      tenureMonths: tenure
    });

    alert("Loan Applied Successfully ✅");
    fetchLoans();
  };

  return (
    <div className="space-y-10">

      <h1 className="text-3xl font-bold">My Loans</h1>

      {/* 🔥 Calculator */}
      <LoanCalculator
        amount={amount}
        setAmount={setAmount}
        months={tenure}
        setMonths={setTenure}
      />

      {/* 🔥 Apply Section */}
      <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">

        <div>
          <h2 className="text-lg font-semibold">
            ₹ {amount}
          </h2>
          <p className="text-gray-600">
            {tenure} months tenure
          </p>
        </div>

        <button
          onClick={applyLoan}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Apply Loan
        </button>

      </div>

      {/* 🔥 Loan History */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-semibold mb-4">
          Loan History
        </h2>

        <table className="w-full text-left">

          <thead className="border-b">
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Interest</th>
              <th>EMI</th>
              <th>Status</th>
              <th>Tenure</th>
              <th>Remaining</th>
            </tr>
          </thead>

          <tbody>
  {loans.map((loan) => {

    const totalMonths = loan.tenureMonths || 1;
    const remaining = loan.remainingMonths ?? totalMonths;

    const progress =
      ((totalMonths - remaining) / totalMonths) * 100;

    return (
      <tr key={loan.id} className="border-b">

        <td>{loan.id}</td>

        <td>₹ {loan.amount}</td>

        <td>{loan.interestRate}%</td>

        <td>
          {loan.emi ? `₹ ${loan.emi.toFixed(2)}` : "-"}
        </td>

        <td>
          <span className={`font-semibold 
            ${loan.status === "APPROVED" ? "text-green-600" :
              loan.status === "REJECTED" ? "text-red-600" :
              "text-yellow-600"}`}>
            {loan.status}
          </span>
        </td>

        <td>{loan.tenureMonths}M</td>

        {/* 🔥 Progress + Remaining */}
        <td className="w-48">

          <div className="text-sm mb-1">
            {remaining} months left
          </div>

          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="bg-blue-600 h-2 rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

        </td>

        {/* 🔥 Penalty */}
        <td>
          {loan.penaltyAmount > 0 ? (
            <span className="text-red-600 font-semibold">
              ₹ {loan.penaltyAmount.toFixed(2)}
            </span>
          ) : (
            <span className="text-gray-400">-</span>
          )}
        </td>

      </tr>
    );
  })}
</tbody>

        </table>

      </div>

    </div>
  );
}