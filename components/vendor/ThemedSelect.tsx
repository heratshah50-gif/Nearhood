"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

type Option = {
  value: string;
  label: string;
};

type ThemedSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
};

export default function ThemedSelect({
  value,
  onChange,
  options,
  placeholder = "Select...",
  className = "",
}: ThemedSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border-2 text-sm bg-white cursor-pointer transition-all ${
          isOpen
            ? "border-primary-500 ring-4 ring-primary-100"
            : "border-neutral-200 hover:border-primary-300"
        }`}
      >
        <span className={selectedOption ? "text-neutral-800" : "text-neutral-400"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-primary-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-primary-200 rounded-xl shadow-xl z-[300] max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors ${
                option.value === value
                  ? "bg-primary-50 text-primary-700 font-medium"
                  : "text-neutral-700 hover:bg-primary-50/50"
              } ${option.value === options[0]?.value ? "rounded-t-lg" : ""} ${
                option.value === options[options.length - 1]?.value ? "rounded-b-lg" : ""
              }`}
            >
              <span>{option.label}</span>
              {option.value === value && <Check className="w-4 h-4 text-primary-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
