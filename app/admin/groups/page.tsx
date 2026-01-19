"use client";

import { useState } from "react";

const TABS = ["All Groups", "Active Groups", "In Negotiation", "Closed Groups"] as const;

const ROWS = [
  { id: 1, name: "Syylne Heights", property: "Styylite Heights", members: "28 Members", status: "In Negotiation" as const },
  { id: 2, name: "Green Valley Group", property: "Green Valley Residency", members: "15 Members", status: "Active" as const },
  { id: 3, name: "Royal Crysta Buyers", property: "Royal Crysta", members: "42 Members", status: "Closed" as const },
  { id: 4, name: "Dev Krishnam Group", property: "Dev Krishnam Heights", members: "22 Members", status: "Active" as const },
  { id: 5, name: "Shivalik Greens Group", property: "Shivalik Greens", members: "18 Members", status: "In Negotiation" as const },
];

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  "In Negotiation": "bg-orange-100 text-orange-700",
  Closed: "bg-neutral-100 text-neutral-600",
};

export default function GroupsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All Groups");

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t ? "bg-[#3b82f6] text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Group Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Property</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Members</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Status</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.id} className="border-b border-neutral-100 hover:bg-neutral-50/50">
                  <td className="py-3 px-4 font-medium text-neutral-800">{r.name}</td>
                  <td className="py-3 px-4 text-sm text-neutral-600">{r.property}</td>
                  <td className="py-3 px-4 text-sm text-neutral-600">{r.members}</td>
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
      </div>
    </div>
  );
}
