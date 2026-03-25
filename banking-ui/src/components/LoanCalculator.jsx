import React from "react";

export default function LoanCalculator({ amount, setAmount, months, setMonths }) {

  const interestRate = 10;
  const options = [3, 6, 12, 18, 24, 36];

  const calculateEMI = () => {
    const monthlyRate = interestRate / (12 * 100);

    const emi =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    return emi.toFixed(2);
  };

  const emi = calculateEMI();
  const total = (emi * months).toFixed(2);
  const interest = (total - amount).toFixed(2);

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">

      <h2 className="text-2xl font-bold">Loan Calculator</h2>

      {/* 🔥 Interest Rate */}
      <p className="text-sm text-gray-500">
        Interest Rate: <span className="font-semibold">10% per annum</span>
      </p>

      {/* Amount Input */}
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full border p-3 rounded"
      />

      {/* 🔥 Dot Slider */}
      <div className="relative mt-6">

        <div className="h-1 bg-gray-300 absolute top-3 left-0 right-0 rounded"></div>

        <div className="flex justify-between relative">

          {options.map((opt) => (
            <div
              key={opt}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setMonths(opt)}
            >
              <div
                className={`w-5 h-5 rounded-full transition-all duration-200 
                  ${months === opt ? "bg-blue-600 scale-125" : "bg-gray-400"}
                `}
              ></div>

              <span className="mt-2 text-sm">{opt}M</span>
            </div>
          ))}

        </div>
      </div>

      {/* 🔥 Result */}
      <div className="bg-blue-50 p-4 rounded space-y-1">

        <p className="text-gray-600">Monthly EMI</p>
        <h3 className="text-xl font-bold text-blue-600">₹ {emi}</h3>

        <p className="text-gray-600">
          Total Payable: ₹ {total}
        </p>

        <p className="text-gray-600">
          Interest: ₹ {interest}
        </p>

      </div>

    </div>
  );
}