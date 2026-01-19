"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Filter, Menu } from "lucide-react";
import { getPropertyImage } from "@/lib/property-images";

const ROWS = [
  { id: 1, name: "Styylite Heights", sub: "4 BHK Flats", location: "Satellite, Ahmedabad", status: "Active" as const, units: "47 Units", image: getPropertyImage(0, "80x60") },
  { id: 2, name: "Green Valley Residency", sub: "3 & 4 BHK", location: "SG Highway, Ahmedabad", status: "Sold Out" as const, units: "26 Units", image: getPropertyImage(1, "80x60") },
  { id: 3, name: "Royal Crysta", sub: "2, 3 & 4 BHK", location: "Bodakdev, Ahmedabad", status: "Upcoming" as const, units: "38 Units", image: getPropertyImage(2, "80x60") },
  { id: 4, name: "Dev Krishnam Heights", sub: "3 BHK", location: "Prahlad Nagar, Ahmedabad", status: "Active" as const, units: "52 Units", image: getPropertyImage(3, "80x60") },
  { id: 5, name: "Shivalik Greens", sub: "2 & 3 BHK", location: "Thaltej, Ahmedabad", status: "Active" as const, units: "31 Units", image: getPropertyImage(4, "80x60") },
];

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  "Sold Out": "bg-red-100 text-red-700",
  Upcoming: "bg-sky-100 text-sky-700",
};

export default function PropertyListingsPage() {
  const [search, setSearch] = useState("");
  const [loc, setLoc] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search properties..."
            className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] outline-none"
          />
        </div>
        <select
          value={loc}
          onChange={(e) => setLoc(e.target.value)}
          className="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
        >
          <option value="">Location</option>
          <option>Satellite</option>
          <option>SG Highway</option>
          <option>Bodakdev</option>
          <option>Prahlad Nagar</option>
          <option>Thaltej</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
        >
          <option value="">Status</option>
          <option>Active</option>
          <option>Sold Out</option>
          <option>Upcoming</option>
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
        >
          <option value="">Type</option>
          <option>2 BHK</option>
          <option>3 BHK</option>
          <option>4 BHK</option>
        </select>
        <button className="p-2.5 border border-neutral-300 rounded-lg hover:bg-neutral-50">
          <Menu className="w-5 h-5 text-neutral-600" />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Property Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Location</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Units Available</th>
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
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[r.status] || "bg-neutral-100 text-neutral-600"}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-neutral-600">{r.units}</td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-sm text-[#1e3a5f] hover:underline font-medium mr-3">Edit</button>
                    <button className="text-sm text-[#1e3a5f] hover:underline font-medium">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
