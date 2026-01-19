"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(8000000); // ₹80 Lacs
  const [interestRate, setInterestRate] = useState(6.75);
  const [loanTenure, setLoanTenure] = useState(20); // Years

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Calculate EMI
  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100; // Monthly interest rate
    const tenure = loanTenure * 12; // Total months

    if (rate === 0) {
      return principal / tenure;
    }

    const emi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
    return emi;
  };

  const monthlyEMI = calculateEMI();
  const totalPayable = monthlyEMI * loanTenure * 12;
  const totalInterest = totalPayable - loanAmount;
  const principalAmount = loanAmount;

  // Format currency
  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} Lacs`;
    }
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString("en-IN");
  };

  // Calculate percentage for semi-circle chart
  const principalPercentage = (principalAmount / totalPayable) * 100;
  const interestPercentage = (totalInterest / totalPayable) * 100;

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-neutral-50" id="emi-calculator">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2
            className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            EMI Calculator
          </h2>
          <p className="text-lg text-neutral-500">
            Calculate your monthly home loan EMI and plan your finances better
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Left Side - Input Controls */}
            <div className="space-y-8">
              {/* Loan Amount */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-neutral-700">Loan Amount</label>
                  <span className="text-lg font-bold text-neutral-800">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="100000"
                    max="130000000"
                    step="100000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider-primary"
                    style={{
                      background: `linear-gradient(to right, #9333EA 0%, #9333EA ${((loanAmount - 100000) / (130000000 - 100000)) * 100}%, #E5E5E5 ${((loanAmount - 100000) / (130000000 - 100000)) * 100}%, #E5E5E5 100%)`,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-neutral-400">
                  <span>₹1 Lac</span>
                  <span>₹13 Cr</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-neutral-700">Interest Rate (% P.A.)</label>
                  <span className="text-lg font-bold text-neutral-800">{interestRate.toFixed(2)}%</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="0.25"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider-primary"
                    style={{
                      background: `linear-gradient(to right, #9333EA 0%, #9333EA ${((interestRate - 1) / (30 - 1)) * 100}%, #E5E5E5 ${((interestRate - 1) / (30 - 1)) * 100}%, #E5E5E5 100%)`,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-neutral-400">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-neutral-700">Loan Tenure</label>
                  <span className="text-lg font-bold text-neutral-800">{loanTenure} Years</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-full h-2.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider-primary"
                    style={{
                      background: `linear-gradient(to right, #9333EA 0%, #9333EA ${((loanTenure - 1) / (30 - 1)) * 100}%, #E5E5E5 ${((loanTenure - 1) / (30 - 1)) * 100}%, #E5E5E5 100%)`,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-neutral-400">
                  <span>1 Year</span>
                  <span>30 Years</span>
                </div>
              </div>
            </div>

            {/* Right Side - Output Results */}
            <div className="flex flex-col items-center justify-center space-y-8">
              {/* Semi-circular Chart */}
              <div className="relative w-full max-w-xs h-40 flex items-center justify-center">
                <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}>
                  {/* Background arc (grey) - Complete semi-circle */}
                  <path
                    d="M 20 80 A 80 80 0 0 1 180 80"
                    fill="none"
                    stroke="#E5E5E5"
                    strokeWidth="24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Filled arc (purple) - Complete semi-circle */}
                  <path
                    d="M 20 80 A 80 80 0 0 1 180 80"
                    fill="none"
                    stroke="#9333EA"
                    strokeWidth="24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
                  <p className="text-xs text-neutral-400 mb-2">Your Monthly Home EMI</p>
                  <p className="text-4xl font-bold text-neutral-800" style={{ fontFamily: "var(--font-display)" }}>
                    ₹{formatNumber(Math.round(monthlyEMI))}
                  </p>
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="grid grid-cols-3 gap-4 w-full">
                <div className="text-center">
                  <p className="text-xs text-neutral-400 mb-1">Interest Amount</p>
                  <p className="text-lg font-bold text-primary-600">{formatCurrency(totalInterest)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-neutral-400 mb-1">Principal Amount</p>
                  <p className="text-lg font-bold text-primary-600">{formatCurrency(principalAmount)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-neutral-400 mb-1">Total Payable Amount</p>
                  <p className="text-lg font-bold text-primary-600">{formatCurrency(totalPayable)}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}