"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, ChevronDown } from "lucide-react";
import Link from "next/link";
import { AHMEDABAD_LOCATIONS } from "@/lib/ahmedabad-locations";

const heroPropertyTypes = ["1BHK Flats", "2BHK Flats", "3BHK Flats", "4BHK Flats", "5BHK Flats", "Duplex", "Plots", "Houses & Apartments"];
const configurations = ["2 BHK", "3 BHK", "3 BHK + CSP", "4 BHK", "5 BHK", "Penthouse"];

interface PropertySearchProps {
  variant?: "default" | "compact";
}

export default function PropertySearch({ variant = "default" }: PropertySearchProps) {
  const [heroCity] = useState("Ahmedabad");
  const [heroProperty, setHeroProperty] = useState("");
  const [propertyOpen, setPropertyOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  // Sub-regions and budget filter state
  const [selectedSubRegions, setSelectedSubRegions] = useState<string[]>([]);
  const [selectedConfigs, setSelectedConfigs] = useState<string[]>([]);
  const [budgetValue, setBudgetValue] = useState(150); // represents 0.1 Cr – 15 Cr
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const toggleSubRegion = (loc: string) => {
    setSelectedSubRegions((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  const toggleConfig = (cfg: string) => {
    setSelectedConfigs((prev) =>
      prev.includes(cfg) ? prev.filter((c) => c !== cfg) : [...prev, cfg]
    );
  };

  const clearAllAdvanced = () => {
    setSelectedSubRegions([]);
    setSelectedConfigs([]);
    setBudgetValue(150);
  };

  const maxBudgetCr = (budgetValue / 10).toFixed(1);

  const searchParams = [
    heroCity && `city=${encodeURIComponent(heroCity)}`,
    selectedLocation && `location=${encodeURIComponent(selectedLocation)}`,
    heroProperty && `type=${encodeURIComponent(heroProperty)}`,
    selectedSubRegions.length && `areas=${encodeURIComponent(selectedSubRegions.join(","))}`,
    selectedConfigs.length && `config=${encodeURIComponent(selectedConfigs.join(","))}`,
    budgetValue && `budgetMaxCr=${maxBudgetCr}`,
  ]
    .filter(Boolean)
    .join("&");

  const searchHref = "/properties" + (searchParams ? "?" + searchParams : "");
  const isCompact = variant === "compact";

  return (
    <section className={isCompact ? "pt-4 pb-4 bg-neutral-50" : "pt-4 pb-6 md:pt-5 md:pb-7 bg-neutral-50"}>
      <div className={isCompact ? "container-custom flex justify-center" : "container-custom"}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={
            isCompact
              ? "max-w-4xl w-full bg-white rounded-2xl shadow-lg border border-neutral-200 p-3 md:p-4"
              : "bg-white rounded-xl md:rounded-2xl shadow-lg border border-neutral-200 p-4 md:p-6"
          }
        >
          <p className="text-xs md:text-sm text-neutral-500 mb-3 md:mb-4 uppercase tracking-wide text-center font-bold">
            Best platform to get group discounts on premium properties in Ahmedabad
          </p>

          {/* Primary search row */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-3">
            {/* Ahmedabad dropdown */}
            <div className="relative flex-1">
              <label className="block text-xs font-medium text-neutral-500 mb-1">
                City
              </label>
              <button
                type="button"
                onClick={() => {
                  setLocationOpen(!locationOpen);
                  if (!locationOpen) {
                    setShowAdvancedFilters(false);
                  }
                }}
                className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl border-2 border-neutral-200 bg-primary-50/50 hover:border-primary-200 transition-colors text-left"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <MapPin className="w-4 h-4 text-primary-600 flex-shrink-0" />
                  <span className="text-neutral-800 font-medium truncate">
                    {selectedLocation || "Ahmedabad"}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 transition-transform flex-shrink-0 ${
                    locationOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {locationOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    aria-hidden
                    onClick={() => setLocationOpen(false)}
                  />
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-neutral-100 py-1.5 z-50 max-h-48 overflow-y-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedLocation("");
                        setLocationOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 hover:bg-primary-50 text-neutral-700 text-sm ${
                        !selectedLocation ? "bg-primary-50 font-medium" : ""
                      }`}
                    >
                      All Locations
                    </button>
                    {AHMEDABAD_LOCATIONS.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => {
                          setSelectedLocation(loc);
                          setLocationOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 hover:bg-primary-50 text-neutral-700 text-sm ${
                          selectedLocation === loc ? "bg-primary-50 font-medium" : ""
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="relative flex-1">
              <label className="block text-xs font-medium text-neutral-500 mb-1">
                Select Property
              </label>
              <button
                type="button"
                onClick={() => {
                  setPropertyOpen(!propertyOpen);
                  if (!propertyOpen) {
                    setShowAdvancedFilters(false);
                  }
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 border-neutral-200 hover:border-primary-200 bg-white text-left"
              >
                <span className={heroProperty ? "text-neutral-800" : "text-neutral-400"}>
                  {heroProperty || "1BHK / 2BHK / 3BHK..."}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 transition-transform ${
                    propertyOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {propertyOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    aria-hidden
                    onClick={() => setPropertyOpen(false)}
                  />
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-neutral-100 py-1.5 z-50 max-h-44 overflow-y-auto">
                    {heroPropertyTypes.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => {
                          setHeroProperty(p);
                          setPropertyOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-primary-50 text-neutral-700 text-sm"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Budget trigger */}
            <button
              type="button"
              onClick={() => {
                setShowAdvancedFilters(!showAdvancedFilters);
                if (!showAdvancedFilters) {
                  setLocationOpen(false);
                }
              }}
              className="flex items-center justify-between rounded-xl border-2 border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-700 bg-white hover:border-primary-200 transition-colors"
            >
              <span>Budget & More Filters</span>
              <ChevronDown
                className={`w-4 h-4 text-neutral-400 transition-transform ${
                  showAdvancedFilters ? "rotate-180" : ""
                }`}
              />
            </button>

            <div className="flex items-end">
              <Link
                href={searchHref}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors"
              >
                <Search className="w-5 h-5" /> Search
              </Link>
            </div>
          </div>

          {/* Advanced filters panel – opens when user clicks Budget & More Filters */}
          {showAdvancedFilters && (
            <div className="mt-2 border-t border-neutral-200 pt-2">
              <div className="max-h-[220px] overflow-y-auto pr-1">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {/* Locations / Sub-regions */}
                <div>
                  <h3 className="text-sm font-semibold text-neutral-800 mb-3 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary-600" />
                    Locations in Ahmedabad
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {AHMEDABAD_LOCATIONS.map((loc) => {
                      const active = selectedSubRegions.includes(loc);
                      return (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => toggleSubRegion(loc)}
                          className={`px-3 py-1.5 rounded-full text-xs md:text-sm border transition-colors ${
                            active
                              ? "bg-primary-50 border-primary-400 text-primary-700"
                              : "bg-neutral-50 border-neutral-200 text-neutral-700 hover:border-primary-200"
                          }`}
                        >
                          {loc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Configuration */}
                <div>
                  <h3 className="text-sm font-semibold text-neutral-800 mb-3">
                    Configuration
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {configurations.map((cfg) => {
                      const active = selectedConfigs.includes(cfg);
                      return (
                        <button
                          key={cfg}
                          type="button"
                          onClick={() => toggleConfig(cfg)}
                          className={`px-3 py-1.5 rounded-full text-xs md:text-sm border transition-colors ${
                            active
                              ? "bg-primary-50 border-primary-400 text-primary-700"
                              : "bg-neutral-50 border-neutral-200 text-neutral-700 hover:border-primary-200"
                          }`}
                        >
                          {cfg}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget slider */}
                <div className="pb-2">
                  <h3 className="text-sm font-semibold text-neutral-800 mb-3">
                    Budget
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min={10}
                      max={150}
                      step={5}
                      value={budgetValue}
                      onChange={(e) => setBudgetValue(Number(e.target.value))}
                      className="w-full accent-primary-500"
                    />
                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-primary-200 bg-primary-50 text-xs md:text-sm font-semibold text-primary-700">
                      0.1 Cr - {maxBudgetCr} Cr
                    </div>
                  </div>
                </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row justify-end gap-3">
                <button
                  type="button"
                  onClick={clearAllAdvanced}
                  className="px-4 py-2 rounded-lg border border-neutral-300 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  Clear all
                </button>
                <button
                  type="button"
                  onClick={() => setShowAdvancedFilters(false)}
                  className="px-5 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
