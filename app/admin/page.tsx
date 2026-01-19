"use client";

import { Building2, Users, Handshake, UserPlus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getPropertyImage } from "@/lib/property-images";

const METRICS = [
  { label: "Total Properties", value: "128", icon: Building2, color: "bg-blue-500", bg: "bg-blue-50", text: "text-blue-600" },
  { label: "Active Groups", value: "24", icon: Users, color: "bg-orange-500", bg: "bg-orange-50", text: "text-orange-600" },
  { label: "Pending Negotiations", value: "8", icon: Handshake, color: "bg-green-500", bg: "bg-green-50", text: "text-green-600" },
  { label: "New Users Today", value: "15", icon: UserPlus, color: "bg-neutral-600", bg: "bg-neutral-100", text: "text-neutral-600" },
];

const CHART_LABELS = ["4/11", "6/01", "4/31", "4/61", "11/01", "BP 213"];
// Simple line data: [x% across, y% from bottom]. 6 points.
const LINE_ACTIVE = [0, 40, 25, 55, 70, 85];
const LINE_NEGOTIATION = [0, 20, 50, 45, 60, 70];
const LINE_CLOSED = [0, 10, 25, 40, 55, 65];

const SUMMARY = [
  { value: "24", label: "Active Groups" },
  { value: "12", label: "In Negotiation" },
  { value: "6", label: "Deals Closed" },
];

const RECENT = [
  { name: "Soredils Heights", image: getPropertyImage(0, "200x120") },
  { name: "Green Valley Residency", image: getPropertyImage(1, "200x120") },
];

function GroupActivityChart() {
  const w = 100;
  const h = 20;
  const pad = 2;
  const toX = (i: number) => pad + (i / (CHART_LABELS.length - 1)) * (w - 2 * pad);
  const toY = (p: number) => pad + (1 - p / 100) * (h - 2 * pad);
  const line = (arr: number[]) => arr.map((p, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(p)}`).join(" ");
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-5">
      <h3 className="font-semibold text-neutral-800 mb-4">Group Activity</h3>
      <div className="h-32 flex items-end gap-1">
        {CHART_LABELS.map((l, i) => (
          <div key={l} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex-1 flex items-end gap-px">
              <div
                className="flex-1 bg-blue-400 rounded-t"
                style={{ height: `${LINE_ACTIVE[i]}%` }}
              />
              <div
                className="flex-1 bg-orange-400 rounded-t"
                style={{ height: `${LINE_NEGOTIATION[i]}%` }}
              />
              <div
                className="flex-1 bg-green-400 rounded-t"
                style={{ height: `${LINE_CLOSED[i]}%` }}
              />
            </div>
            <span className="text-[10px] text-neutral-500">{l}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-3">
        <span className="flex items-center gap-1.5 text-xs"><span className="w-2.5 h-2.5 rounded bg-blue-400" />Active Groups</span>
        <span className="flex items-center gap-1.5 text-xs"><span className="w-2.5 h-2.5 rounded bg-orange-400" />In Negotiation</span>
        <span className="flex items-center gap-1.5 text-xs"><span className="w-2.5 h-2.5 rounded bg-green-400" />Closed Deals</span>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map(({ label, value, icon: Icon, color, bg, text }) => (
          <div key={label} className={`${bg} rounded-xl border border-neutral-200 p-5 flex items-center gap-4`}>
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-white`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-800" style={{ fontFamily: "var(--font-display)" }}>{value}</p>
              <p className={`text-sm font-medium ${text}`}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart - spans 2 cols */}
        <div className="lg:col-span-2">
          <GroupActivityChart />
        </div>
        {/* Group Activity Summary */}
        <div className="space-y-3">
          <h3 className="font-semibold text-neutral-800">Group Activity</h3>
          {SUMMARY.map(({ value, label }) => (
            <div key={label} className="bg-white rounded-xl border border-neutral-200 p-4">
              <p className="text-xl font-bold text-neutral-800">{value}</p>
              <p className="text-sm text-neutral-500">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Negotiations */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <h3 className="font-semibold text-neutral-800 mb-4">Recent Negotiations</h3>
        <div className="flex flex-wrap gap-4">
          {RECENT.map(({ name, image }) => (
            <div key={name} className="flex items-center gap-4 p-3 rounded-xl border border-neutral-200 hover:border-[#1e3a5f] transition-colors">
              <div className="w-24 h-16 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0 relative">
                <Image src={image} alt={name} fill className="w-full h-full object-cover" sizes="96px" />
              </div>
              <div>
                <p className="font-medium text-neutral-800">{name}</p>
                <Link href="/admin/negotiations" className="text-sm text-[#1e3a5f] hover:underline font-medium">View</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
