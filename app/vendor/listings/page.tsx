"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Car, ChevronDown, ArrowRight, Plus, LayoutGrid } from "lucide-react";

const CATEGORIES = [
  {
    id: "properties",
    name: "Properties",
    description: "Apartments, Villas, Plots",
    icon: Building2,
    href: "/vendor/listings/properties",
    count: 8,
  },
  {
    id: "vehicles",
    name: "Vehicles",
    description: "Cars, Bikes, Commercial",
    icon: Car,
    href: "/vendor/listings/vehicles",
    count: 5,
  },
];

export default function MyListingsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedCategoryData = CATEGORIES.find(c => c.id === selectedCategory);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsDropdownOpen(false);
  };

  const handleViewListings = () => {
    if (selectedCategoryData) {
      router.push(selectedCategoryData.href);
    }
  };

  const handleAddNew = () => {
    if (selectedCategoryData) {
      router.push(`${selectedCategoryData.href}?add=true`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-800" style={{ fontFamily: "var(--font-display)" }}>
          My Listings
        </h2>
        <p className="text-neutral-600 mt-1">Select a category to view and manage your listings</p>
      </div>

      {/* Category Selection */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Dropdown */}
          <div className="flex-1 w-full sm:max-w-md relative">
            <label className="block text-sm font-medium text-neutral-700 mb-2">Select Category</label>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border-2 border-neutral-200 rounded-xl text-left hover:border-primary-300 focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400 transition-all"
            >
              {selectedCategoryData ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <selectedCategoryData.icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-800">{selectedCategoryData.name}</p>
                    <p className="text-xs text-neutral-500">{selectedCategoryData.description}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                    <LayoutGrid className="w-5 h-5 text-neutral-400" />
                  </div>
                  <span className="text-neutral-500">Choose a category...</span>
                </div>
              )}
              <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-xl shadow-xl z-20 overflow-hidden">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-primary-50 transition-colors ${
                      selectedCategory === category.id ? "bg-primary-50" : ""
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      selectedCategory === category.id ? "bg-primary-500 text-white" : "bg-neutral-100 text-neutral-600"
                    }`}>
                      <category.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-neutral-800">{category.name}</p>
                      <p className="text-xs text-neutral-500">{category.description}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary-600 bg-primary-100 px-2.5 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 sm:pt-7">
            <button
              onClick={handleViewListings}
              disabled={!selectedCategory}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                selectedCategory
                  ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:from-primary-600 hover:to-primary-700"
                  : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
              }`}
            >
              View Listings
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleAddNew}
              disabled={!selectedCategory}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                selectedCategory
                  ? "bg-white border-2 border-primary-200 text-primary-600 hover:bg-primary-50"
                  : "bg-neutral-50 border-2 border-neutral-200 text-neutral-400 cursor-not-allowed"
              }`}
            >
              <Plus className="w-4 h-4" />
              Add New
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
