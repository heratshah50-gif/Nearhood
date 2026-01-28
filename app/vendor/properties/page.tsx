"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Plus, Upload, X } from "lucide-react";
import ThemedSelect from "@/components/vendor/ThemedSelect";
import { getPropertyImage } from "@/lib/property-images";

type PropertyRow = {
  id: number;
  name: string;
  sub: string;
  location: string;
  type: string;
  units: string;
  groups: string;
  status: string;
  image: string;
};

const INITIAL_ROWS: PropertyRow[] = [
  { id: 1, name: "Skyline Heights", sub: "Apartments", location: "Gurgaon", type: "Apartments", units: "25", groups: "3", status: "Active", image: getPropertyImage(0, "80x60") },
  { id: 2, name: "Green Valley Residency", sub: "Luxury Apartments", location: "Pune", type: "Apartments", units: "20", groups: "2", status: "Active", image: getPropertyImage(1, "80x60") },
  { id: 3, name: "Royal Crysta", sub: "Premium Flats", location: "Noida", type: "Apartments", units: "18", groups: "4", status: "Active", image: getPropertyImage(2, "80x60") },
  { id: 4, name: "Urban Greens", sub: "Apartments", location: "Bangalore", type: "Apartments", units: "0", groups: "0", status: "Sold Out", image: getPropertyImage(3, "80x60") },
  { id: 5, name: "Zenith Towers", sub: "Luxury Flats", location: "Mumbai", type: "Apartments", units: "30", groups: "5", status: "Active", image: getPropertyImage(4, "80x60") },
];

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  "Sold Out": "bg-red-100 text-red-700",
  Upcoming: "bg-amber-100 text-amber-700",
};

export default function MyPropertiesPage() {
  const [rows, setRows] = useState<PropertyRow[]>(INITIAL_ROWS);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addMode, setAddMode] = useState<"single" | "bulk">("single");

  const [form, setForm] = useState({
    name: "",
    location: "",
    type: "Apartments",
    units: "0",
  });

  const filtered = rows.filter((r) => {
    const matchesSearch =
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = !type || r.type === type;
    const matchesStatus = !status || r.status === status;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAddSingle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const nextId = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
    const newRow: PropertyRow = {
      id: nextId,
      name: form.name.trim(),
      sub: form.type,
      location: form.location || "Ahmedabad",
      type: form.type,
      units: form.units || "0",
      groups: "0",
      status: "Upcoming",
      image: getPropertyImage((nextId - 1) % 5, "80x60"),
    };
    setRows([newRow, ...rows]);
    setForm({ name: "", location: "", type: "Apartments", units: "0" });
    setIsAddOpen(false);
  };

  const handleBulkAdd = () => {
    const baseId = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
    const newRows: PropertyRow[] = [
      {
        id: baseId,
        name: "Sunrise Meadows",
        sub: "Township",
        location: "Ahmedabad",
        type: "Apartments",
        units: "40",
        groups: "2",
        status: "Upcoming",
        image: getPropertyImage(0, "80x60"),
      },
      {
        id: baseId + 1,
        name: "Lakeview Villas",
        sub: "Villas",
        location: "Vadodara",
        type: "Villas",
        units: "16",
        groups: "1",
        status: "Upcoming",
        image: getPropertyImage(1, "80x60"),
      },
    ];
    setRows([...newRows, ...rows]);
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-4 relative">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by property or project name"
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-neutral-200 bg-white text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-300 shadow-sm"
            />
          </div>
          <ThemedSelect
            value={type}
            onChange={setType}
            placeholder="Type"
            options={[
              { value: "", label: "All Types" },
              { value: "Apartments", label: "Apartments" },
              { value: "Villas", label: "Villas" },
              { value: "Plots", label: "Plots" },
            ]}
            className="min-w-[130px]"
          />
          <ThemedSelect
            value={status}
            onChange={setStatus}
            placeholder="Status"
            options={[
              { value: "", label: "All Status" },
              { value: "Active", label: "Active" },
              { value: "Sold Out", label: "Sold Out" },
              { value: "Upcoming", label: "Upcoming" },
            ]}
            className="min-w-[130px]"
          />
        </div>
        <button
          onClick={() => {
            setAddMode("single");
            setIsAddOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:from-primary-600 hover:to-primary-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Property</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/80">
                <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-600">Property</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-600">Location</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-600">Type</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-600">Units Available</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-600">Groups Active</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-600">Status</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-neutral-100 hover:bg-neutral-50/70">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-10 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0 relative">
                        <Image src={r.image} alt={r.name} fill className="w-full h-full object-cover" sizes="56px" />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900 text-sm" style={{ fontFamily: "var(--font-display)" }}>
                          {r.name}
                        </p>
                        <p className="text-xs text-neutral-500">{r.sub}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-neutral-600">{r.location}</td>
                  <td className="py-3 px-4 text-sm text-neutral-600">{r.type}</td>
                  <td className="py-3 px-4 text-sm text-neutral-600">{r.units}</td>
                  <td className="py-3 px-4 text-sm text-neutral-600">{r.groups}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] font-medium ${STATUS_STYLES[r.status] || "bg-neutral-100 text-neutral-600"}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-xs text-primary-600 hover:text-primary-700 font-semibold">View ▾</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-neutral-200 flex items-center justify-between text-sm text-neutral-600 bg-neutral-50/60">
          <span>
            Showing {filtered.length} of {rows.length}
          </span>
          <button className="px-4 py-1.5 rounded-full border border-neutral-300 hover:bg-neutral-100">Next &gt;</button>
        </div>
      </div>

      {/* Add / Bulk modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 md:p-7 relative">
            <button
              onClick={() => setIsAddOpen(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 transition-colors"
              aria-label="Close add property"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-500 mb-1">Vendor tools</p>
              <h2 className="text-xl font-bold text-neutral-900" style={{ fontFamily: "var(--font-display)" }}>
                Add properties to Nearhood
              </h2>
              <p className="text-sm text-neutral-600 mt-1">
                Create a new listing or upload multiple projects at once. You can update details later from this panel.
              </p>
            </div>

            <div className="inline-flex rounded-full bg-neutral-100 p-1 mb-5">
              <button
                type="button"
                onClick={() => setAddMode("single")}
                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${
                  addMode === "single" ? "bg-white text-primary-700 shadow-sm" : "text-neutral-600"
                }`}
              >
                Single property
              </button>
              <button
                type="button"
                onClick={() => setAddMode("bulk")}
                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${
                  addMode === "bulk" ? "bg-white text-primary-700 shadow-sm" : "text-neutral-600"
                }`}
              >
                Bulk upload
              </button>
            </div>

            {addMode === "single" ? (
              <form onSubmit={handleAddSingle} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Property name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Nearhood Heights"
                    className="w-full px-3 py-2.5 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-300"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">City</label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                      placeholder="e.g. Ahmedabad"
                      className="w-full px-3 py-2.5 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Property type</label>
                    <div className="relative">
                      <select
                        value={form.type}
                        onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                        className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl border-2 border-neutral-200 text-sm bg-white cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-500 hover:border-primary-300 transition-all"
                      >
                        <option value="Apartments">Apartments</option>
                        <option value="Villas">Villas</option>
                        <option value="Plots">Plots</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Units available</label>
                    <input
                      type="number"
                      min={0}
                      value={form.units}
                      onChange={(e) => setForm((f) => ({ ...f, units: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-300"
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddOpen(false)}
                    className="px-4 py-2 rounded-full border border-neutral-300 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:from-primary-600 hover:to-primary-700 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add property</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-neutral-600">
                  Upload a CSV or Excel file with your project details. We will process the file and create listings for each
                  property.
                </p>
                <div className="border border-dashed border-neutral-300 rounded-xl p-5 flex flex-col items-center justify-center gap-3 bg-neutral-50">
                  <Upload className="w-8 h-8 text-primary-500" />
                  <p className="text-sm font-medium text-neutral-800">Drag & drop your file here</p>
                  <p className="text-xs text-neutral-500">Supported formats: .csv, .xlsx • Max 5MB</p>
                  <button className="mt-2 px-4 py-2 rounded-full bg-white border border-primary-200 text-primary-700 text-sm font-semibold hover:bg-primary-50 transition-colors">
                    Choose file
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddOpen(false)}
                    className="px-4 py-2 rounded-full border border-neutral-300 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleBulkAdd}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:from-primary-600 hover:to-primary-700 transition-all"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Simulate bulk upload</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
