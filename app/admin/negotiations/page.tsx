"use client";

import { ArrowRight } from "lucide-react";

const STATUS = [
  { label: "Pending Negotiations", value: "8", active: true },
  { label: "In Progress", value: "4", active: false },
  { label: "Completed", value: "32", active: false },
];

const OFFERS = [
  { title: "Developer Offers 165 Lakh per Unit", sub: "Updated 2 hours ago", type: "developer" },
  { title: "Counter Offer Submitted 162 Lakh per Unit", sub: "By Group Admin", type: "counter" },
];

const NOTES = [
  { by: "Admin", time: "35 minutes ago", text: "Sent revised terms to developer." },
  { by: "Developer", time: "12 minutes ago", text: "Reviewed and will respond by EOD." },
];

export default function NegotiationsPage() {
  return (
    <div className="space-y-6">
      {/* Status bar */}
      <div className="flex flex-wrap gap-4">
        {STATUS.map(({ label, value, active }) => (
          <div
            key={label}
            className={`px-5 py-3 rounded-xl border-2 text-sm font-medium ${
              active ? "border-[#3b82f6] bg-[#3b82f6]/5 text-[#1e3a5f]" : "border-neutral-200 bg-white text-neutral-600"
            }`}
          >
            {label}: <span className="font-bold">{value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Negotiation + Offers */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-neutral-200 p-5">
            <h3 className="font-semibold text-neutral-800 mb-3">Current Negotiation</h3>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="font-medium text-neutral-800">Green Valley Residency</p>
                <p className="text-sm text-neutral-500">In Progress</p>
                <p className="text-xs text-neutral-400 mt-1">Last Update: 2 hours ago</p>
              </div>
              <button className="px-4 py-2 bg-[#1e3a5f] text-white rounded-lg text-sm font-medium hover:bg-[#2d4a6f]">
                View Updates
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-5">
            <h3 className="font-semibold text-neutral-800 mb-4">Offers & Updates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OFFERS.map((o) => (
                <div
                  key={o.title}
                  className="p-4 rounded-xl border-2 border-neutral-200 hover:border-[#1e3a5f]/30 transition-colors flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-medium text-neutral-800">{o.title}</p>
                    <p className="text-xs text-neutral-500 mt-1">{o.sub}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Negotiation Notes */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <h3 className="font-semibold text-neutral-800 mb-4">Negotiation Notes</h3>
          <div className="space-y-4">
            {NOTES.map((n, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                  {n.by[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-800">{n.by}</p>
                  <p className="text-xs text-neutral-500">{n.time}</p>
                  <p className="text-sm text-neutral-600 mt-1">{n.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
