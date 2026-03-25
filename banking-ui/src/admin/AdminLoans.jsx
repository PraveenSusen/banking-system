import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminLoans() {

  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const res = await api.get("/loans/all");
      setLoans(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const approveLoan = async (id) => {
    await api.put(`/loans/approve/${id}`);
    fetchLoans();
  };

  const rejectLoan = async (id) => {
    await api.put(`/loans/reject/${id}`);
    fetchLoans();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Loan Approvals</h1>

      <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">

        <table className="w-full text-left">

          <thead className="border-b">
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Interest</th>
              <th>Tenure</th>
              <th>Status</th>
              <th>User</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id} className="border-b">

                <td>{loan.id}</td>
                <td>₹ {loan.amount}</td>
                <td>{loan.interestRate}%</td>
                <td>{loan.tenureMonths} months</td>
                <td>
                  <span className={`font-semibold 
                    ${loan.status === "APPROVED" ? "text-green-600" :
                      loan.status === "REJECTED" ? "text-red-600" :
                      "text-yellow-600"}`}>
                    {loan.status}
                  </span>
                </td>
                <td>{loan.user?.email}</td>

                <td>
                  {loan.status === "PENDING" && (
                    <div className="flex gap-2">

                      <button
                        onClick={() => approveLoan(loan.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => rejectLoan(loan.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Reject
                      </button>

                    </div>
                  )}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}