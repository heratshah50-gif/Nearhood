"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { getPropertyImage } from "@/lib/property-images";

const ROWS = [
  { id: 1, name: "Skyline Heights", sub: "Apartments", location: "Gurgaon", type: "Apartments", units: "25", groups: "3", status: "Active", image: getPropertyImage(0, "80x60") },
  { id: 2, name: "Green Valley Residency", sub: "Luxury Apartments", location: "Pune", type: "Apartments", units: "20", groups: "2", status: "Active", image: getPropertyImage(1, "80x60") },
  { id: 3, name: "Royal Crysta", sub: "Premium Flats", location: "Noida", type: "Apartments", units: "18", groups: "4", status: "Active", image: getPropertyImage(2, "80x60") },
  { id: 4, name: "Urban Greens", sub: "Apartments", location: "Bangalore", type: "Apartments", units: "0", groups: "0", status: "Sold Out", image: getPropertyImage(3, "80x60") },
  { id: 5, name: "Zenith Towers", sub: "Luxury Flats", location: "Mumbai", type: "Apartments", units: "30", groups: "5", status: "Active", image: getPropertyImage(4, "80x60") },
];

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  "Sold Out": "bg-red-100 text-red-700",
  Upcoming: "bg-sky-100 text-sky-700",
};

export default function MyPropertiesPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status1, setStatus1] = useState("");
  const [status2, setStatus2] = useState("");

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by property or project name"
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] outline-none"
            />
          </div>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
          >
            <option value="">Type</option>
            <option>Apartments</option>
            <option>Villas</option>
            <option>Plots</option>
          </select>
          <select
            value={status1}
            onChange={(e) => setStatus1(e.target.value)}
            className="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
          >
            <option value="">Status</option>
            <option>Active</option>
            <option>Sold Out</option>
            <option>Upcoming</option>
          </select>
        </div>
        <button className="px-5 py-2.5 bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-semibold rounded-lg transition-colors">
          + Add Property
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Property</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Location</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Units Available</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Groups Active</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Status</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.id} className="border-b border-neutral-100 hover:bg-neutral-50/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-10 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0 relative">
                        <Image src={r.image} alt={r.name} fill className="w-full h-full object-cover" sizes="56px" />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-800">{r.name}</p>
                        <p className="text-xs text-neutral-500">{r.sub}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-neutral-600">{r.location}</td>
                  <td className="py-3 px-4 text-sm text-neutral-600">{r.type}</td>
                  <td className="py-3 px-4 text-sm text-neutral-600">{r.units}</td>
                  <td className="py-3 px-4 text-sm text-neutral-600">{r.groups}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[r.status] || "bg-neutral-100 text-neutral-600"}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-sm text-[#1e3a5f] hover:underline font-medium">View ▼</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-neutral-200 flex items-center justify-between text-sm text-neutral-600">
          <span>Showing 5 of 8</span>
          <button className="px-4 py-1.5 border border-neutral-300 rounded-lg hover:bg-neutral-50">Next &gt;</button>
        </div>
      </div>
    </div>
  );
}
