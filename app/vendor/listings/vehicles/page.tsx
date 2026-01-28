"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Plus, Upload, X, ArrowLeft, Car, MapPin, IndianRupee, Calendar, Fuel, Gauge, Settings, Palette, Users, FileText, Edit3, Save, Trash2, Zap, Cog } from "lucide-react";
import ThemedSelect from "@/components/vendor/ThemedSelect";

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
  // Extended vehicle details
  brand?: string;
  model?: string;
  year?: string;
  price?: string;
  fuelType?: string;
  transmission?: string;
  mileage?: string;
  engine?: string;
  color?: string;
  seatingCapacity?: string;
  features?: string[];
  description?: string;
  createdAt?: string;
};

const VEHICLE_IMAGES = [
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=200&h=150&fit=crop",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&h=150&fit=crop",
  "https://images.unsplash.com/photo-1542362567-b07e54358753?w=200&h=150&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop",
  "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=200&h=150&fit=crop",
];

const INITIAL_ROWS: VehicleRow[] = [
  { 
    id: 1, name: "Honda City 2024", sub: "Sedan", location: "Ahmedabad", type: "Cars", units: "15", groups: "2", status: "Active", image: VEHICLE_IMAGES[0],
    brand: "Honda", model: "City", year: "2024", price: "12,50,000", fuelType: "Petrol", transmission: "CVT Automatic",
    mileage: "18.4 kmpl", engine: "1498 cc", color: "Platinum White Pearl", seatingCapacity: "5",
    features: ["Sunroof", "Touchscreen Infotainment", "Rear AC Vents", "Wireless Charging", "LED Headlamps"],
    description: "The all-new Honda City 2024 comes with premium features and excellent fuel efficiency.",
    createdAt: "Jan 10, 2024"
  },
  { 
    id: 2, name: "Royal Enfield Classic 350", sub: "Cruiser Bike", location: "Mumbai", type: "Bikes", units: "25", groups: "3", status: "Active", image: VEHICLE_IMAGES[1],
    brand: "Royal Enfield", model: "Classic 350", year: "2024", price: "2,10,000", fuelType: "Petrol", transmission: "Manual",
    mileage: "35 kmpl", engine: "349 cc", color: "Stealth Black", seatingCapacity: "2",
    features: ["ABS", "Digital Console", "USB Charging", "LED Tail Light"],
    description: "The iconic Royal Enfield Classic 350 with modern features and timeless design.",
    createdAt: "Feb 5, 2024"
  },
  { 
    id: 3, name: "Tata Nexon EV", sub: "Electric SUV", location: "Pune", type: "Cars", units: "10", groups: "1", status: "Active", image: VEHICLE_IMAGES[2],
    brand: "Tata", model: "Nexon EV", year: "2024", price: "14,99,000", fuelType: "Electric", transmission: "Automatic",
    mileage: "312 km range", engine: "30.2 kWh Battery", color: "Teal Blue", seatingCapacity: "5",
    features: ["Fast Charging", "Connected Car Tech", "Ventilated Seats", "Air Purifier", "Zconnect App"],
    description: "India's safest electric SUV with impressive range and features.",
    createdAt: "Mar 15, 2024"
  },
  { 
    id: 4, name: "Mahindra Bolero", sub: "Commercial Vehicle", location: "Delhi", type: "Commercial", units: "0", groups: "0", status: "Sold Out", image: VEHICLE_IMAGES[3],
    brand: "Mahindra", model: "Bolero", year: "2023", price: "9,80,000", fuelType: "Diesel", transmission: "Manual",
    mileage: "16.2 kmpl", engine: "1493 cc", color: "Diamond White", seatingCapacity: "7",
    features: ["Power Steering", "Central Locking", "AC", "Music System"],
    description: "Reliable workhorse perfect for commercial and personal use.",
    createdAt: "Dec 20, 2023"
  },
  { 
    id: 5, name: "Hyundai Creta", sub: "Compact SUV", location: "Bangalore", type: "Cars", units: "20", groups: "4", status: "Active", image: VEHICLE_IMAGES[4],
    brand: "Hyundai", model: "Creta", year: "2024", price: "15,75,000", fuelType: "Petrol", transmission: "DCT Automatic",
    mileage: "17.4 kmpl", engine: "1497 cc", color: "Atlas White", seatingCapacity: "5",
    features: ["Panoramic Sunroof", "ADAS", "Ventilated Seats", "Bose Sound System", "360 Camera"],
    description: "Premium SUV with advanced safety features and luxurious interiors.",
    createdAt: "Apr 1, 2024"
  },
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

  // View/Edit modal state
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleRow | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<VehicleRow | null>(null);

  const [form, setForm] = useState({
    name: "",
    location: "",
    type: "Cars",
    units: "0",
  });

  const handleViewVehicle = (vehicle: VehicleRow) => {
    setSelectedVehicle(vehicle);
    setEditForm({ ...vehicle });
    setIsViewOpen(true);
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    if (!editForm) return;
    setRows(rows.map(r => r.id === editForm.id ? editForm : r));
    setSelectedVehicle(editForm);
    setIsEditing(false);
  };

  const handleDeleteVehicle = (id: number) => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      setRows(rows.filter(r => r.id !== id));
      setIsViewOpen(false);
      setSelectedVehicle(null);
    }
  };

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
        <ThemedSelect
          value={type}
          onChange={setType}
          placeholder="All Types"
          options={[
            { value: "", label: "All Types" },
            { value: "Cars", label: "Cars" },
            { value: "Bikes", label: "Bikes" },
            { value: "Commercial", label: "Commercial" },
          ]}
          className="min-w-[130px]"
        />
        <ThemedSelect
          value={status}
          onChange={setStatus}
          placeholder="All Status"
          options={[
            { value: "", label: "All Status" },
            { value: "Active", label: "Active" },
            { value: "Sold Out", label: "Sold Out" },
            { value: "Upcoming", label: "Upcoming" },
          ]}
          className="min-w-[130px]"
        />
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
                    <button 
                      onClick={() => handleViewVehicle(r)}
                      className="text-sm text-violet-600 hover:text-violet-700 font-semibold"
                    >
                      View →
                    </button>
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
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative bg-gradient-to-r from-violet-500 to-violet-600">
            {/* Modal Header */}
            <div className="px-6 py-4">
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

            <div className="p-6 bg-white rounded-b-2xl">
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
                      <div className="relative">
                        <select
                          value={form.type}
                          onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                          className="w-full appearance-none px-4 py-3 pr-10 rounded-xl border-2 border-neutral-200 text-sm bg-white cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-500 hover:border-primary-300 transition-all"
                        >
                          <option value="Cars">Cars</option>
                          <option value="Bikes">Bikes</option>
                          <option value="Commercial">Commercial</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
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

      {/* View/Edit Vehicle Modal */}
      {isViewOpen && selectedVehicle && editForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md overflow-y-auto py-8">
          <div className="w-full max-w-3xl rounded-2xl shadow-2xl relative mx-4 bg-gradient-to-r from-violet-500 to-violet-600">
            {/* Modal Header */}
            <div className="px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 rounded-lg overflow-hidden bg-white/20 flex-shrink-0">
                    <Image src={selectedVehicle.image} alt={selectedVehicle.name} width={64} height={48} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/80 mb-1">Vehicle Details</p>
                    <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                      {selectedVehicle.name}
                    </h2>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSaveEdit}
                      className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white hover:bg-emerald-600 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsViewOpen(false)}
                    className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[70vh] overflow-y-auto bg-white">
              {/* Status Badge & Date */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${STATUS_STYLES[selectedVehicle.status]}`}>
                    {selectedVehicle.status}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-violet-100 text-violet-700">
                    <Car className="w-4 h-4" />
                    {selectedVehicle.type}
                  </span>
                </div>
                <span className="text-sm text-neutral-500">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Added: {selectedVehicle.createdAt || "N/A"}
                </span>
              </div>

              {/* Brand & Model Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-neutral-500 mb-1.5 block">Brand</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.brand || ""}
                      onChange={(e) => setEditForm({ ...editForm, brand: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400"
                    />
                  ) : (
                    <p className="text-neutral-800 font-medium">{selectedVehicle.brand || "N/A"}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-500 mb-1.5 block">Model</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.model || ""}
                      onChange={(e) => setEditForm({ ...editForm, model: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400"
                    />
                  ) : (
                    <p className="text-neutral-800 font-medium">{selectedVehicle.model || "N/A"}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-500 mb-1.5 block">Year</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.year || ""}
                      onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400"
                    />
                  ) : (
                    <p className="text-neutral-800 font-medium">{selectedVehicle.year || "N/A"}</p>
                  )}
                </div>
              </div>

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-violet-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-violet-600 mb-1">
                    <IndianRupee className="w-4 h-4" />
                    <span className="text-xs font-medium">Price</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.price || ""}
                      onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                      className="w-full px-2 py-1 rounded-lg border border-violet-200 text-sm"
                      placeholder="e.g. 12,50,000"
                    />
                  ) : (
                    <p className="text-lg font-bold text-violet-700">₹{selectedVehicle.price || "N/A"}</p>
                  )}
                </div>
                <div className="bg-emerald-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-emerald-600 mb-1">
                    <Fuel className="w-4 h-4" />
                    <span className="text-xs font-medium">Fuel Type</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.fuelType || ""}
                      onChange={(e) => setEditForm({ ...editForm, fuelType: e.target.value })}
                      className="w-full px-2 py-1 rounded-lg border border-emerald-200 text-sm"
                    />
                  ) : (
                    <p className="text-lg font-bold text-emerald-700 flex items-center gap-1">
                      {selectedVehicle.fuelType === "Electric" && <Zap className="w-4 h-4" />}
                      {selectedVehicle.fuelType || "N/A"}
                    </p>
                  )}
                </div>
                <div className="bg-amber-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-amber-600 mb-1">
                    <Gauge className="w-4 h-4" />
                    <span className="text-xs font-medium">Mileage</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.mileage || ""}
                      onChange={(e) => setEditForm({ ...editForm, mileage: e.target.value })}
                      className="w-full px-2 py-1 rounded-lg border border-amber-200 text-sm"
                    />
                  ) : (
                    <p className="text-lg font-bold text-amber-700">{selectedVehicle.mileage || "N/A"}</p>
                  )}
                </div>
                <div className="bg-primary-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-primary-600 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xs font-medium">Units Available</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editForm.units}
                      onChange={(e) => setEditForm({ ...editForm, units: e.target.value })}
                      className="w-full px-2 py-1 rounded-lg border border-primary-200 text-sm"
                    />
                  ) : (
                    <p className="text-lg font-bold text-primary-700">{selectedVehicle.units}</p>
                  )}
                </div>
              </div>

              {/* Technical Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="flex items-center gap-1 text-sm font-medium text-neutral-500 mb-1.5">
                    <Cog className="w-4 h-4" />
                    Engine
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.engine || ""}
                      onChange={(e) => setEditForm({ ...editForm, engine: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400"
                    />
                  ) : (
                    <p className="text-neutral-800 font-medium">{selectedVehicle.engine || "N/A"}</p>
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-1 text-sm font-medium text-neutral-500 mb-1.5">
                    <Settings className="w-4 h-4" />
                    Transmission
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.transmission || ""}
                      onChange={(e) => setEditForm({ ...editForm, transmission: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400"
                    />
                  ) : (
                    <p className="text-neutral-800 font-medium">{selectedVehicle.transmission || "N/A"}</p>
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-1 text-sm font-medium text-neutral-500 mb-1.5">
                    <Palette className="w-4 h-4" />
                    Color
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.color || ""}
                      onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400"
                    />
                  ) : (
                    <p className="text-neutral-800 font-medium">{selectedVehicle.color || "N/A"}</p>
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-1 text-sm font-medium text-neutral-500 mb-1.5">
                    <Users className="w-4 h-4" />
                    Seating
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.seatingCapacity || ""}
                      onChange={(e) => setEditForm({ ...editForm, seatingCapacity: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400"
                    />
                  ) : (
                    <p className="text-neutral-800 font-medium">{selectedVehicle.seatingCapacity || "N/A"} Seater</p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-500 mb-1.5">
                  <MapPin className="w-4 h-4" />
                  Available Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400"
                  />
                ) : (
                  <p className="text-neutral-800 font-medium">{selectedVehicle.location}</p>
                )}
              </div>

              {/* Features */}
              <div className="mb-6">
                <label className="text-sm font-medium text-neutral-500 mb-2 block">Key Features</label>
                <div className="flex flex-wrap gap-2">
                  {(selectedVehicle.features || []).map((feature, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-violet-100 rounded-full text-sm text-violet-700 font-medium">
                      {feature}
                    </span>
                  ))}
                  {(!selectedVehicle.features || selectedVehicle.features.length === 0) && (
                    <span className="text-sm text-neutral-400">No features listed</span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-500 mb-1.5">
                  <FileText className="w-4 h-4" />
                  Description
                </label>
                {isEditing ? (
                  <textarea
                    value={editForm.description || ""}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400 resize-none"
                  />
                ) : (
                  <p className="text-neutral-700">{selectedVehicle.description || "No description available"}</p>
                )}
              </div>

              {/* Groups Info */}
              <div className="bg-neutral-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-neutral-500">Active Groups</label>
                    <p className="text-2xl font-bold text-neutral-800">{selectedVehicle.groups}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-violet-600" />
                  </div>
                </div>
              </div>

              {/* Status Change (only in edit mode) */}
              {isEditing && (
                <div className="mb-6">
                  <label className="text-sm font-medium text-neutral-500 mb-1.5 block">Status</label>
                  <div className="relative">
                    <select
                      value={editForm.status}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl border-2 border-neutral-200 text-sm bg-white cursor-pointer focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-500 hover:border-violet-300 transition-all"
                    >
                      <option value="Active">Active</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Sold Out">Sold Out</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
              <button
                onClick={() => handleDeleteVehicle(selectedVehicle.id)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 text-sm font-medium transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Vehicle
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setIsViewOpen(false);
                    setIsEditing(false);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-neutral-300 text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
                >
                  Close
                </button>
                {isEditing && (
                  <button
                    onClick={handleSaveEdit}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 hover:from-violet-600 hover:to-violet-700 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
