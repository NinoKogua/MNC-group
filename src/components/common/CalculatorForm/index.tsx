"use client";

import React, { useState } from "react";
import { Loader } from "lucide-react";
import Dropdown from "../Dropdown";

const LOAN_OPTIONS = ["იპოთეკა", "საკრედიტო ხაზი", "სამომხმარებლო"] as const;
const TERM_OPTIONS = [2, 12, 24, 36, 60] as const;
const FLOOR_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
const SCHEME_OPTIONS = ["სტანდარტული სქემა", "არასტანდარტული"] as const;

type LoanType = (typeof LOAN_OPTIONS)[number];
type TermType = (typeof TERM_OPTIONS)[number];
type FloorType = (typeof FLOOR_OPTIONS)[number];
type SchemeType = (typeof SCHEME_OPTIONS)[number];

const CalculatorForm: React.FC = () => {
  const [loanType, setLoanType] = useState<LoanType>(LOAN_OPTIONS[0]);
  const [term, setTerm] = useState<TermType>(TERM_OPTIONS[0]);
  const [floorCount, setFloorCount] = useState<FloorType>(FLOOR_OPTIONS[0]);
  const [scheme, setScheme] = useState<SchemeType>(SCHEME_OPTIONS[0]);
  const [area, setArea] = useState<number>(123);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalLoan: number;
  } | null>(null);

  const maxArea = 250;
  const minArea = 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setResult(null);

    const payload = { loanType, term, floorCount, scheme, area };
    console.log("Sending payload:", payload);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setResult({ monthlyPayment: 1500, totalLoan: 150000 });
    } catch (error) {
      alert("შეცდომა გამოთვლისას");
    } finally {
      setIsCalculating(false);
    }
  };

  const progressPercent = ((area - minArea) / (maxArea - minArea)) * 100;

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 md:p-10 bg-white rounded-2xl shadow-sm border border-gray-100"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 font-kirovi">
        ფართის კალკულატორი
      </h2>
      <p className="text-gray-500 mb-8 font-medium">
        შეავსეთ მონაცემები სასურველი პირობების მისაღებად.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Dropdown
          label="სესხის ტიპი"
          current={loanType}
          options={LOAN_OPTIONS}
          onSelect={(val) => setLoanType(val as LoanType)}
        />
        <Dropdown
          label="ვადები"
          current={term}
          options={TERM_OPTIONS}
          onSelect={(val) => setTerm(val as TermType)}
        />
        <Dropdown
          label="სართული"
          current={floorCount}
          options={FLOOR_OPTIONS}
          onSelect={(val) => setFloorCount(val as FloorType)}
        />
        <Dropdown
          label="დაფარვის სქემა"
          current={scheme}
          options={SCHEME_OPTIONS}
          onSelect={(val) => setScheme(val as SchemeType)}
        />
      </div>

      <div className="mb-10">
        <div className="flex justify-between text-sm font-bold text-gray-600 mb-4">
          <span>ფართობი</span>
          <span className="text-[#1A7550]">
            {area} M² / {maxArea} M²
          </span>
        </div>

        <input
          type="range"
          min={minArea}
          max={maxArea}
          value={area}
          onChange={(e) => setArea(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1A7550] 
            [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
          style={{
            background: `linear-gradient(to right, #1A7550 0%, #1A7550 ${progressPercent}%, #D1D5DB ${progressPercent}%, #D1D5DB 100%)`,
          }}
        />
      </div>

      {result && (
        <div className="text-center mb-8 p-6 bg-green-50 rounded-xl border border-green-100 animate-in fade-in zoom-in duration-300">
          <p className="text-2xl font-bold text-[#1A7550]">
            ყოველთვიური: ${result.monthlyPayment}
          </p>
          <p className="text-gray-500 mt-1 font-medium">
            სრული სესხი: ${result.totalLoan}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isCalculating}
        className="w-full bg-[#1A7550] hover:bg-[#145c3f] text-white text-lg font-bold py-3 rounded-xl transition-all 
        disabled:bg-gray-300 flex justify-center items-center gap-3 shadow-lg shadow-green-900/10"
      >
        {isCalculating ? (
          <>
            <Loader size={22} className="animate-spin" /> მიმდინარეობს...
          </>
        ) : (
          "გამოთვლა"
        )}
      </button>
    </form>
  );
};

export default CalculatorForm;
