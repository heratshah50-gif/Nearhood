"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const ROWS = [
  { id: 1, name: "Skyline Heights Buyers", property: "Skyline Heights", buyers: "28", date: "Apr 12, 2024", status: "Active" },
  { id: 2, name: "Green Valley Renters", property: "Green Valley", buyers: "15", date: "Apr 13, 2024", status: "In Negotiation" },
  { id: 3, name: "Royal Crysta Group", property: "Royal Crysta", buyers: "42", date: "Apr 14, 2024", status: "Upcoming" },
  { id: 4, name: "Urban Greens Buyers", property: "Urban Greens", buyers: "22", date: "Apr 15, 2024", status: "Closed" },
  { id: 5, name: "Zenith Towers Group", property: "Zenith Towers", buyers: "18", date: "Apr 16, 2024", status: "Active" },
  { id: 6, name: "Prestige Heights Buyers", property: "Prestige Heights", buyers: "35", date: "Apr 17, 2024", status: "In Negotiation" },
];

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  "In Negotiation": "bg-orange-100 text-orange-700",
  Upcoming: "bg-sky-100 text-sky-700",
  Closed: "bg-neutral-100 text-neutral-600",
};

export default function GroupInquiriesPage() {
  const [search, setSearch] = useState("");
  const [property, setProperty] = useState("");
  const [status, setStatus] = useState("");

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
              placeholder="Search by property"
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] outline-none"
            />
          </div>
          <select
            value={property}
            onChange={(e) => setProperty(e.target.value)}
            className="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
          >
            <option value="">My Property</option>
            <option>Skyline Heights</option>
            <option>Green Valley</option>
            <option>Royal Crysta</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
          >
            <option value="">Status</option>
            <option>Active</option>
            <option>In Negotiation</option>
            <option>Upcoming</option>
            <option>Closed</option>
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
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Group Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Property</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Interested Buyers</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Registry Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Status</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.id} className="border-b border-neutral-100 hover:bg-neutral-50/50">
                  <td className="py-3 px-4 font-medium text-neutral-800">{r.name}</td>
                  <td className="py-3 px-4 text-sm text-neutral-600">{r.property}</td>
                  <td className="py-3 px-4 text-sm text-neutral-600">{r.buyers}</td>
                  <td className="py-3 px-4 text-sm text-neutral-600">{r.date}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[r.status] || "bg-neutral-100 text-neutral-600"}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-sm text-[#1e3a5f] hover:underline font-medium">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-neutral-200 flex items-center justify-between text-sm text-neutral-600">
          <span>Showing 6 of 8</span>
          <button className="px-4 py-1.5 border border-neutral-300 rounded-lg hover:bg-neutral-50">Next &gt;</button>
        </div>
      </div>
    </div>
  );
}
