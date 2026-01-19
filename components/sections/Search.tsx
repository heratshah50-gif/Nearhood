"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search as SearchIcon,
  MapPin,
  ChevronDown,
  X,
  Home,
  IndianRupee,
  SlidersHorizontal,
} from "lucide-react";

const cities = [
  "New Delhi",
  "Mumbai",
  "Bangalore",
  "Pune",
  "Hyderabad",
  "Chennai",
  "Gurgaon",
  "Noida",
];

const budgetRanges = [
  { label: "Under ₹50 Lakhs", value: "0-50" },
  { label: "₹50 Lakhs - ₹1 Cr", value: "50-100" },
  { label: "₹1 Cr - ₹2 Cr", value: "100-200" },
  { label: "₹2 Cr - ₹5 Cr", value: "200-500" },
  { label: "Above ₹5 Cr", value: "500+" },
];

const bhkOptions = [
  { label: "1 BHK", value: "1" },
  { label: "2 BHK", value: "2" },
  { label: "3 BHK", value: "3" },
  { label: "4 BHK", value: "4" },
  { label: "4+ BHK", value: "4+" },
];

const popularLocations = [
  "Gurgaon",
  "Dwarka",
  "Greater Noida",
  "Whitefield",
  "Andheri",
  "Powai",
  "Bandra",
  "Electronic City",
  "Hitech City",
  "OMR",
];

interface DropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  value: string;
  placeholder: string;
  options: { label: string; value: string }[] | string[];
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  label: string;
}

function Dropdown({
  isOpen,
  onToggle,
  value,
  placeholder,
  options,
  onChange,
  icon,
  label,
}: DropdownProps) {
  const displayValue = typeof options[0] === "string"
    ? value || placeholder
    : (options as { label: string; value: string }[]).find((o) => o.value === value)?.label || placeholder;

  return (
    <div className="relative">
      <label className="block text-xs font-medium text-neutral-500 mb-1.5 pl-1">
        {label}
      </label>
      <button
        type="button"
        onClick={onToggle}
        className={`w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
          isOpen
            ? "border-primary-400 bg-primary-50/50"
            : "border-neutral-200 hover:border-neutral-300 bg-white"
        }`}
      >
        <div className="flex items-center gap-2 text-left">
          {icon && <span className="text-neutral-400">{icon}</span>}
          <span className={value ? "text-neutral-800" : "text-neutral-400"}>
            {displayValue}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-neutral-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-neutral-100 py-2 z-50 max-h-60 overflow-y-auto"
        >
          {options.map((option) => {
            const optionValue = typeof option === "string" ? option : option.value;
            const optionLabel = typeof option === "string" ? option : option.label;
            const isSelected = value === optionValue;

            return (
              <button
                key={optionValue}
                type="button"
                onClick={() => {
                  onChange(optionValue);
                  onToggle();
                }}
                className={`w-full text-left px-4 py-2.5 transition-colors ${
                  isSelected
                    ? "bg-primary-50 text-primary-600"
                    : "text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                {optionLabel}
              </button>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}

export default function Search() {
  const [city, setCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [budget, setBudget] = useState("");
  const [bhk, setBhk] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  const clearFilters = () => {
    setCity("");
    setSearchQuery("");
    setBudget("");
    setBhk("");
    setSelectedLocations([]);
  };

  const hasFilters = city || searchQuery || budget || bhk || selectedLocations.length > 0;

  return (
    <section className="relative py-12 bg-neutral-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl lg:rounded-3xl shadow-2xl shadow-neutral-200/50 border border-neutral-100 p-6 lg:p-8"
        >
          {/* Search Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6">
            {/* City Selector */}
            <div className="lg:col-span-2">
              <Dropdown
                label="City"
                isOpen={activeDropdown === "city"}
                onToggle={() => toggleDropdown("city")}
                value={city}
                placeholder="Select City"
                options={cities}
                onChange={setCity}
                icon={<MapPin className="w-4 h-4" />}
              />
            </div>

            {/* Search Input */}
            <div className="lg:col-span-5">
              <label className="block text-xs font-medium text-neutral-500 mb-1.5 pl-1">
                Search
              </label>
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by project, builder, or location"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all outline-none text-neutral-800 placeholder:text-neutral-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutral-100 transition-colors"
                  >
                    <X className="w-4 h-4 text-neutral-400" />
                  </button>
                )}
              </div>
            </div>

            {/* Budget Selector */}
            <div className="lg:col-span-2">
              <Dropdown
                label="Budget"
                isOpen={activeDropdown === "budget"}
                onToggle={() => toggleDropdown("budget")}
                value={budget}
                placeholder="Any Budget"
                options={budgetRanges}
                onChange={setBudget}
                icon={<IndianRupee className="w-4 h-4" />}
              />
            </div>

            {/* BHK Selector */}
            <div className="lg:col-span-2">
              <Dropdown
                label="Configuration"
                isOpen={activeDropdown === "bhk"}
                onToggle={() => toggleDropdown("bhk")}
                value={bhk}
                placeholder="Any BHK"
                options={bhkOptions}
                onChange={setBhk}
                icon={<Home className="w-4 h-4" />}
              />
            </div>

            {/* Search Button */}
            <div className="lg:col-span-1 flex items-end">
              <button className="w-full h-[52px] bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all flex items-center justify-center gap-2">
                <SearchIcon className="w-5 h-5" />
                <span className="lg:hidden">Search</span>
              </button>
            </div>
          </div>

          {/* Clear Filters */}
          {hasFilters && (
            <div className="mt-4 flex items-center justify-end">
              <button
                onClick={clearFilters}
                className="text-sm text-neutral-500 hover:text-primary-600 flex items-center gap-1 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Clear all filters
              </button>
            </div>
          )}

          {/* Popular Locations */}
          <div className="mt-6 pt-6 border-t border-neutral-100">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-neutral-600">
                Popular Locations
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularLocations.map((location) => {
                const isSelected = selectedLocations.includes(location);
                return (
                  <button
                    key={location}
                    onClick={() => toggleLocation(location)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isSelected
                        ? "bg-primary-500 text-white shadow-md shadow-primary-500/25"
                        : "bg-neutral-100 text-neutral-600 hover:bg-primary-50 hover:text-primary-600"
                    }`}
                  >
                    {location}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-neutral-500 text-sm">
            <span className="font-semibold text-neutral-700">150+ properties</span>{" "}
            available with active group buying deals
          </p>
        </motion.div>
      </div>

      {/* Click outside handler overlay */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </section>
  );
}

