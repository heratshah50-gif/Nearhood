"use client";

import { useState } from "react";
import { Search, Plus, Users } from "lucide-react";

const ROWS = [
  { id: 1, name: "Skyline Heights Buyers", property: "Skyline Heights", buyers: "28", date: "Apr 12, 2024", status: "Active" },
  { id: 2, name: "Green Valley Renters", property: "Green Valley", buyers: "15", date: "Apr 13, 2024", status: "In Negotiation" },
  { id: 3, name: "Royal Crysta Group", property: "Royal Crysta", buyers: "42", date: "Apr 14, 2024", status: "Upcoming" },
  { id: 4, name: "Urban Greens Buyers", property: "Urban Greens", buyers: "22", date: "Apr 15, 2024", status: "Closed" },
  { id: 5, name: "Zenith Towers Group", property: "Zenith Towers", buyers: "18", date: "Apr 16, 2024", status: "Active" },
  { id: 6, name: "Prestige Heights Buyers", property: "Prestige Heights", buyers: "35", date: "Apr 17, 2024", status: "In Negotiation" },
];

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  "In Negotiation": "bg-violet-100 text-violet-700",
  Upcoming: "bg-primary-100 text-primary-700",
  Closed: "bg-neutral-100 text-neutral-600",
};

export default function GroupInquiriesPage() {
  const [search, setSearch] = useState("");
  const [property, setProperty] = useState("");
  const [status, setStatus] = useState("");

  return (
    <div className="space-y-5">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by property"
              className="w-full pl-10 pr-4 py-2.5 border-2 border-neutral-200 rounded-xl text-sm focus:ring-4 focus:ring-primary-100 focus:border-primary-400 outline-none transition-all"
            />
          </div>
          <select
            value={property}
            onChange={(e) => setProperty(e.target.value)}
            className="px-4 py-2.5 border-2 border-neutral-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400"
          >
            <option value="">My Property</option>
            <option>Skyline Heights</option>
            <option>Green Valley</option>
            <option>Royal Crysta</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2.5 border-2 border-neutral-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400"
          >
            <option value="">Status</option>
            <option>Active</option>
            <option>In Negotiation</option>
            <option>Upcoming</option>
            <option>Closed</option>
          </select>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary-500/25">
          <Plus className="w-4 h-4" />
          Add Property
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/80">
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Group Name</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Property</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Interested Buyers</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Registry Date</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Status</th>
                <th className="text-right py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.id} className="border-b border-neutral-100 hover:bg-primary-50/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-primary-100 flex items-center justify-center">
                        <Users className="w-4 h-4 text-primary-600" />
                      </div>
                      <span className="font-medium text-neutral-800">{r.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-sm text-neutral-600">{r.property}</td>
                  <td className="py-3.5 px-4 text-sm font-semibold text-primary-600">{r.buyers}</td>
                  <td className="py-3.5 px-4 text-sm text-neutral-600">{r.date}</td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[r.status] || "bg-neutral-100 text-neutral-600"}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-sm text-primary-600 hover:text-primary-700 font-semibold">View →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-neutral-200 flex items-center justify-between text-sm text-neutral-600 bg-neutral-50/60">
          <span>Showing 6 of 8</span>
          <button className="px-4 py-1.5 rounded-lg border border-neutral-300 hover:bg-white hover:border-primary-300 transition-colors">Next →</button>
        </div>
      </div>
    </div>
  );
}
