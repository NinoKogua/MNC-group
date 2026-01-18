"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownProps<T> {
  label: string;
  current: T;
  options: readonly T[];
  onSelect: (value: T) => void;
}

const Dropdown = <T extends string | number>({
  label,
  current,
  options,
  onSelect,
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: T) => {
    onSelect(value);
    setIsOpen(false);
  };

  const formatValue = (val: T) => {
    if (label === "ვადები") return `${val} თვე`;
    if (label === "სართული") return `${val} სართული`;
    return val;
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div
        className="border border-gray-300 rounded-lg p-3 cursor-pointer bg-white transition-shadow duration-200 hover:shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <label className="text-xs text-gray-500 font-medium block mb-1 tracking-wide">
          {label}
        </label>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-800">
            {formatValue(current)}
          </span>
          <ChevronDown
            size={20}
            className={`text-gray-500 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-track]:rounded-lg
          [&::-webkit-scrollbar-thumb]:bg-[#1A7550]
          [&::-webkit-scrollbar-thumb]:rounded-lg"
        >
          {options.map((option, index) => (
            <div
              key={index}
              className={`p-3 text-base cursor-pointer transition-colors hover:bg-green-50 
                ${current === option ? "bg-green-100 font-semibold text-[#1A7550]" : "text-gray-700"}`}
              onClick={() => handleSelect(option)}
            >
              {formatValue(option)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
