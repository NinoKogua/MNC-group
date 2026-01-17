"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Loader } from 'lucide-react';

// კონსტანტები მკაცრი ტიპიზაციით
const LOAN_OPTIONS = ['იპოთეკა', 'საკრედიტო ხაზი', 'სამომხმარებლო'] as const;
const TERM_OPTIONS = [2, 12, 24, 36, 60] as const;
const FLOOR_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
const SCHEME_OPTIONS = ['სტანდარტული სქემა', 'არასტანდარტული'] as const;

type LoanType = typeof LOAN_OPTIONS[number];
type TermType = typeof TERM_OPTIONS[number];
type FloorType = typeof FLOOR_OPTIONS[number];
type SchemeType = typeof SCHEME_OPTIONS[number];

interface DropdownProps<T> {
    label: string;
    current: T;
    options: readonly T[];
    onSelect: (value: T) => void;
}

const Dropdown = <T extends string | number>({ label, current, options, onSelect }: DropdownProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (value: T) => {
        onSelect(value);
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} className="relative w-full">
            <div
                className="border border-gray-300 rounded-lg p-3 cursor-pointer bg-white transition-shadow duration-200 hover:shadow-md"
                onClick={() => setIsOpen(!isOpen)}
            >
                <label className="text-xs text-gray-500 font-medium block mb-1">{label}</label>
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">
                        {label === 'ვადები' ? `${current} თვე` : label === 'სართული' ? `${current} სართული` : current}
                    </span>
                    <ChevronDown size={20} className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-40 overflow-y-auto">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`p-3 text-lg cursor-pointer hover:bg-green-50 ${current === option ? 'bg-green-100 font-semibold' : ''}`}
                            onClick={() => handleSelect(option)}
                        >
                            {label === 'ვადები' ? `${option} თვე` : label === 'სართული' ? `${option} სართული` : option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const CalculatorForm: React.FC = () => {
    const [loanType, setLoanType] = useState<LoanType>(LOAN_OPTIONS[0]);
    const [term, setTerm] = useState<TermType>(TERM_OPTIONS[0]);
    const [floorCount, setFloorCount] = useState<FloorType>(FLOOR_OPTIONS[0]);
    const [scheme, setScheme] = useState<SchemeType>(SCHEME_OPTIONS[0]);
    const [area, setArea] = useState<number>(123);
    const [isCalculating, setIsCalculating] = useState<boolean>(false);
    const [result, setResult] = useState<{ monthlyPayment: number; totalLoan: number } | null>(null);

    const maxArea = 250;
    const minArea = 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCalculating(true);
        setResult(null);

        const payload = {
            loanType,
            term: Number(term),
            floorCount: Number(floorCount),
            scheme,
            area: Number(area),
        };

        console.log("მონაცემები API-ისთვის:", payload);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const simulatedResult = { monthlyPayment: 1500, totalLoan: 150000 };
            setResult(simulatedResult);
        } catch (error) {
            console.error("კალკულატორის შეცდომა:", error);
            alert("გამოთვლა ვერ მოხერხდა. სცადეთ მოგვიანებით.");
        } finally {
            setIsCalculating(false);
        }
    };

    const progressPercent = ((area - minArea) / (maxArea - minArea)) * 100;

    return (
        <form onSubmit={handleSubmit} className="p-8 md:p-10 bg-white">
            <h2 className="text-2xl md:text-3xl font-kirovi text-gray-800 mb-2">
                ფართის კალკულატორი
            </h2>
            <p className="text-gray-600 mb-8 font-medium">
                გამოიყენეთ ნებისმიერი ფანჯარა და ექსპერიმენტული დიზაინი დასაწყებად.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Dropdown label="სესხის ტიპი" current={loanType} options={LOAN_OPTIONS} onSelect={(val) => setLoanType(val as LoanType)} />
                <Dropdown label="ვადები" current={term} options={TERM_OPTIONS} onSelect={(val) => setTerm(val as TermType)} />
                <Dropdown label="სართული" current={floorCount} options={FLOOR_OPTIONS} onSelect={(val) => setFloorCount(val as FloorType)} />
                <Dropdown label="დაფარვის სქემა" current={scheme} options={SCHEME_OPTIONS} onSelect={(val) => setScheme(val as SchemeType)} />
            </div>

            <div className="mb-8">
                <div className="flex justify-between text-sm font-semibold text-gray-600 mb-2">
                    <span>ფართობი</span>
                    <span>{area} M² - {maxArea} M²</span>
                </div>

                <input
                    type="range"
                    min={minArea}
                    max={maxArea}
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg"
                    style={{
                        background: `linear-gradient(to right, #1A7550 0%, #1A7550 ${progressPercent}%, #D1D5DB ${progressPercent}%, #D1D5DB 100%)`,
                    }}
                />
            </div>

            {result && (
                <div className="text-center mb-6 p-4 bg-green-50 rounded-lg border border-green-200 font-kirovi">
                    <p className="text-xl font-bold text-green-700">
                        ყოველთვიური გადახდა: ${result.monthlyPayment}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        სრული თანხა: ${result.totalLoan}
                    </p>
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-green-700 text-white text-xl font-bold py-2 rounded-xl hover:bg-green-primary transition-colors disabled:bg-gray-400 flex justify-center items-center gap-2 font-kirovi"
                disabled={isCalculating}
            >
                {isCalculating ? (
                    <>
                        <Loader size={20} className="animate-spin" />
                        გამოთვლა...
                    </>
                ) : (
                    'გამოთვლა'
                )}
            </button>
        </form>
    );
};

export default CalculatorForm;
