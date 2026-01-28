"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Plus, Upload, X, ArrowLeft, Car } from "lucide-react";

type VehicleRow = {
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

const VEHICLE_IMAGES = [
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=200&h=150&fit=crop",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&h=150&fit=crop",
  "https://images.unsplash.com/photo-1542362567-b07e54358753?w=200&h=150&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop",
  "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=200&h=150&fit=crop",
];

const INITIAL_ROWS: VehicleRow[] = [
  { id: 1, name: "Honda City 2024", sub: "Sedan", location: "Ahmedabad", type: "Cars", units: "15", groups: "2", status: "Active", image: VEHICLE_IMAGES[0] },
  { id: 2, name: "Royal Enfield Classic 350", sub: "Cruiser Bike", location: "Mumbai", type: "Bikes", units: "25", groups: "3", status: "Active", image: VEHICLE_IMAGES[1] },
  { id: 3, name: "Tata Nexon EV", sub: "Electric SUV", location: "Pune", type: "Cars", units: "10", groups: "1", status: "Active", image: VEHICLE_IMAGES[2] },
  { id: 4, name: "Mahindra Bolero", sub: "Commercial Vehicle", location: "Delhi", type: "Commercial", units: "0", groups: "0", status: "Sold Out", image: VEHICLE_IMAGES[3] },
  { id: 5, name: "Hyundai Creta", sub: "Compact SUV", location: "Bangalore", type: "Cars", units: "20", groups: "4", status: "Active", image: VEHICLE_IMAGES[4] },
];

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  "Sold Out": "bg-red-100 text-red-700",
  Upcoming: "bg-amber-100 text-amber-700",
};

export default function VehicleListingsPage() {
  const searchParams = useSearchParams();
  const [rows, setRows] = useState<VehicleRow[]>(INITIAL_ROWS);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addMode, setAddMode] = useState<"single" | "bulk">("single");

  const [form, setForm] = useState({
    name: "",
    location: "",
    type: "Cars",
    units: "0",
  });

  // Open add modal if ?add=true is in URL
  useEffect(() => {
    if (searchParams.get("add") === "true") {
      setIsAddOpen(true);
    }
  }, [searchParams]);

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
    const newRow: VehicleRow = {
      id: nextId,
      name: form.name.trim(),
      sub: form.type,
      location: form.location || "Ahmedabad",
      type: form.type,
      units: form.units || "0",
      groups: "0",
      status: "Upcoming",
      image: VEHICLE_IMAGES[(nextId - 1) % 5],
    };
    setRows([newRow, ...rows]);
    setForm({ name: "", location: "", type: "Cars", units: "0" });
    setIsAddOpen(false);
  };

  const handleBulkAdd = () => {
    const baseId = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
    const newRows: VehicleRow[] = [
      {
        id: baseId,
        name: "Maruti Swift 2024",
        sub: "Hatchback",
        location: "Chennai",
        type: "Cars",
        units: "30",
        groups: "2",
        status: "Upcoming",
        image: VEHICLE_IMAGES[0],
      },
      {
        id: baseId + 1,
        name: "TVS Apache RTR 200",
        sub: "Sports Bike",
        location: "Hyderabad",
        type: "Bikes",
        units: "40",
        groups: "1",
        status: "Upcoming",
        image: VEHICLE_IMAGES[1],
      },
    ];
    setRows([...newRows, ...rows]);
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-5 relative">
      {/* Back Link & Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            href="/vendor/listings" 
            className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 hover:bg-violet-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Car className="w-5 h-5 text-violet-600" />
              <h2 className="text-xl font-bold text-neutral-800" style={{ fontFamily: "var(--font-display)" }}>
                Vehicle Listings
              </h2>
            </div>
            <p className="text-sm text-neutral-500">Manage your vehicle inventory</p>
          </div>
        </div>
        <button
          onClick={() => {
            setAddMode("single");
            setIsAddOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 hover:shadow-xl hover:from-violet-600 hover:to-violet-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Vehicle</span>
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by vehicle name or location"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-neutral-200 bg-white text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400 transition-all"
          />
        </div>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-4 py-2.5 rounded-xl border-2 border-neutral-200 bg-white text-sm text-neutral-700 focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400"
        >
          <option value="">All Types</option>
          <option value="Cars">Cars</option>
          <option value="Bikes">Bikes</option>
          <option value="Commercial">Commercial</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2.5 rounded-xl border-2 border-neutral-200 bg-white text-sm text-neutral-700 focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Sold Out">Sold Out</option>
          <option value="Upcoming">Upcoming</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/80">
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Vehicle</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Location</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Type</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Units</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Groups</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Status</th>
                <th className="text-right py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-neutral-100 hover:bg-violet-50/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-10 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 relative">
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
                  <td className="py-3.5 px-4 text-sm text-neutral-600">{r.location}</td>
                  <td className="py-3.5 px-4 text-sm text-neutral-600">{r.type}</td>
                  <td className="py-3.5 px-4 text-sm font-semibold text-violet-600">{r.units}</td>
                  <td className="py-3.5 px-4 text-sm text-neutral-600">{r.groups}</td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${STATUS_STYLES[r.status] || "bg-neutral-100 text-neutral-600"}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-sm text-violet-600 hover:text-violet-700 font-semibold">View →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-neutral-200 flex items-center justify-between text-sm text-neutral-600 bg-neutral-50/60">
          <span>
            Showing {filtered.length} of {rows.length} vehicles
          </span>
          <button className="px-4 py-1.5 rounded-lg border border-neutral-300 hover:bg-white hover:border-violet-300 transition-colors">Next →</button>
        </div>
      </div>

      {/* Add / Bulk modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden relative">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-violet-500 to-violet-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/80 mb-1">Vehicle Listings</p>
                  <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                    Add New Vehicle
                  </h2>
                </div>
                <button
                  onClick={() => setIsAddOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="inline-flex rounded-full bg-neutral-100 p-1 mb-5">
                <button
                  type="button"
                  onClick={() => setAddMode("single")}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${
                    addMode === "single" ? "bg-white text-violet-700 shadow-sm" : "text-neutral-600"
                  }`}
                >
                  Single vehicle
                </button>
                <button
                  type="button"
                  onClick={() => setAddMode("bulk")}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${
                    addMode === "bulk" ? "bg-white text-violet-700 shadow-sm" : "text-neutral-600"
                  }`}
                >
                  Bulk upload
                </button>
              </div>

              {addMode === "single" ? (
                <form onSubmit={handleAddSingle} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Vehicle name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="e.g. Honda City 2024"
                      className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">City</label>
                      <input
                        type="text"
                        value={form.location}
                        onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                        placeholder="e.g. Ahmedabad"
                        className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Vehicle type</label>
                      <select
                        value={form.type}
                        onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400"
                      >
                        <option value="Cars">Cars</option>
                        <option value="Bikes">Bikes</option>
                        <option value="Commercial">Commercial</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Units available</label>
                    <input
                      type="number"
                      min={0}
                      value={form.units}
                      onChange={(e) => setForm((f) => ({ ...f, units: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400"
                    />
                  </div>

                  <div className="mt-5 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAddOpen(false)}
                      className="px-5 py-2.5 rounded-xl border border-neutral-300 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 hover:from-violet-600 hover:to-violet-700 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Vehicle</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-neutral-600">
                    Upload a CSV or Excel file with your vehicle details. We will process the file and create listings for each vehicle.
                  </p>
                  <div className="border-2 border-dashed border-neutral-300 rounded-xl p-6 flex flex-col items-center justify-center gap-3 bg-neutral-50">
                    <Upload className="w-10 h-10 text-violet-500" />
                    <p className="text-sm font-medium text-neutral-800">Drag & drop your file here</p>
                    <p className="text-xs text-neutral-500">Supported formats: .csv, .xlsx • Max 5MB</p>
                    <button className="mt-2 px-4 py-2 rounded-lg bg-white border border-violet-200 text-violet-700 text-sm font-semibold hover:bg-violet-50 transition-colors">
                      Choose file
                    </button>
                  </div>
                  <div className="flex items-center justify-end gap-3 mt-5">
                    <button
                      type="button"
                      onClick={() => setIsAddOpen(false)}
                      className="px-5 py-2.5 rounded-xl border border-neutral-300 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleBulkAdd}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 hover:from-violet-600 hover:to-violet-700 transition-all"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
