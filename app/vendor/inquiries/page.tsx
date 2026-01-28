"use client";

import { useState } from "react";
import { Search, Plus, Users, X, Building2, Car, Calendar, Target, FileText, UserCheck, UserMinus, IndianRupee, TrendingUp, Phone, Mail, Clock, MapPin, CheckCircle2, XCircle } from "lucide-react";
import ThemedSelect from "@/components/vendor/ThemedSelect";

type Member = {
  id: number;
  name: string;
  phone: string;
  email: string;
  joinedDate: string;
  location: string;
  status: "active" | "left";
  leftDate?: string;
  leftReason?: string;
};

type GroupRow = {
  id: number;
  name: string;
  property: string;
  category: string;
  buyers: string;
  date: string;
  status: string;
  // Extended details
  description?: string;
  targetMembers?: number;
  currentDiscount?: string;
  expectedSavings?: string;
  endDate?: string;
  activeMembers?: Member[];
  leftMembers?: Member[];
};

const SAMPLE_ACTIVE_MEMBERS: Member[] = [
  { id: 1, name: "Rahul Sharma", phone: "+91 98765 43210", email: "rahul.sharma@email.com", joinedDate: "Apr 12, 2024", location: "Mumbai", status: "active" },
  { id: 2, name: "Priya Patel", phone: "+91 87654 32109", email: "priya.patel@email.com", joinedDate: "Apr 13, 2024", location: "Pune", status: "active" },
  { id: 3, name: "Amit Kumar", phone: "+91 76543 21098", email: "amit.kumar@email.com", joinedDate: "Apr 14, 2024", location: "Delhi", status: "active" },
  { id: 4, name: "Sneha Gupta", phone: "+91 65432 10987", email: "sneha.gupta@email.com", joinedDate: "Apr 15, 2024", location: "Bangalore", status: "active" },
  { id: 5, name: "Vikram Singh", phone: "+91 54321 09876", email: "vikram.singh@email.com", joinedDate: "Apr 16, 2024", location: "Chennai", status: "active" },
];

const SAMPLE_LEFT_MEMBERS: Member[] = [
  { id: 6, name: "Anjali Desai", phone: "+91 43210 98765", email: "anjali.desai@email.com", joinedDate: "Apr 12, 2024", location: "Ahmedabad", status: "left", leftDate: "Apr 20, 2024", leftReason: "Found better deal elsewhere" },
  { id: 7, name: "Rajesh Mehta", phone: "+91 32109 87654", email: "rajesh.mehta@email.com", joinedDate: "Apr 13, 2024", location: "Surat", status: "left", leftDate: "Apr 18, 2024", leftReason: "Personal reasons" },
];

const INITIAL_ROWS: GroupRow[] = [
  { 
    id: 1, name: "Skyline Heights Buyers", property: "Skyline Heights", category: "Property", buyers: "28", date: "Apr 12, 2024", status: "Active",
    description: "Group buying for premium apartments in Skyline Heights with exclusive bulk discounts.",
    targetMembers: 50, currentDiscount: "12%", expectedSavings: "₹8,50,000", endDate: "Jun 30, 2024",
    activeMembers: SAMPLE_ACTIVE_MEMBERS.slice(0, 5), leftMembers: SAMPLE_LEFT_MEMBERS.slice(0, 1)
  },
  { 
    id: 2, name: "Green Valley Renters", property: "Green Valley", category: "Property", buyers: "15", date: "Apr 13, 2024", status: "In Negotiation",
    description: "Collective negotiation for Green Valley luxury apartments.",
    targetMembers: 30, currentDiscount: "8%", expectedSavings: "₹5,20,000", endDate: "Jul 15, 2024",
    activeMembers: SAMPLE_ACTIVE_MEMBERS.slice(0, 3), leftMembers: SAMPLE_LEFT_MEMBERS
  },
  { 
    id: 3, name: "Royal Crysta Group", property: "Royal Crysta", category: "Property", buyers: "42", date: "Apr 14, 2024", status: "Upcoming",
    description: "Upcoming group for Royal Crysta premium flats launch.",
    targetMembers: 60, currentDiscount: "15%", expectedSavings: "₹12,00,000", endDate: "Aug 01, 2024",
    activeMembers: SAMPLE_ACTIVE_MEMBERS, leftMembers: []
  },
  { 
    id: 4, name: "Urban Greens Buyers", property: "Urban Greens", category: "Property", buyers: "22", date: "Apr 15, 2024", status: "Closed",
    description: "Successfully closed group buying deal for Urban Greens.",
    targetMembers: 25, currentDiscount: "10%", expectedSavings: "₹6,80,000", endDate: "Apr 30, 2024",
    activeMembers: SAMPLE_ACTIVE_MEMBERS.slice(0, 4), leftMembers: SAMPLE_LEFT_MEMBERS.slice(0, 1)
  },
  { 
    id: 5, name: "Honda City Buyers", property: "Honda City 2024", category: "Vehicle", buyers: "18", date: "Apr 16, 2024", status: "Active",
    description: "Group purchase for Honda City 2024 model with dealer discounts.",
    targetMembers: 25, currentDiscount: "5%", expectedSavings: "₹75,000", endDate: "May 31, 2024",
    activeMembers: SAMPLE_ACTIVE_MEMBERS.slice(0, 4), leftMembers: []
  },
  { 
    id: 6, name: "Nexon EV Group", property: "Tata Nexon EV", category: "Vehicle", buyers: "35", date: "Apr 17, 2024", status: "In Negotiation",
    description: "Electric vehicle group buying for Tata Nexon EV with charging benefits.",
    targetMembers: 40, currentDiscount: "7%", expectedSavings: "₹1,20,000", endDate: "Jun 15, 2024",
    activeMembers: SAMPLE_ACTIVE_MEMBERS, leftMembers: SAMPLE_LEFT_MEMBERS
  },
];

const PROPERTY_LISTINGS = [
  "Skyline Heights",
  "Green Valley Residency",
  "Royal Crysta",
  "Urban Greens",
  "Zenith Towers",
];

const VEHICLE_LISTINGS = [
  "Honda City 2024",
  "Royal Enfield Classic 350",
  "Tata Nexon EV",
  "Hyundai Creta",
  "Maruti Swift",
];

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  "In Negotiation": "bg-violet-100 text-violet-700",
  Upcoming: "bg-primary-100 text-primary-700",
  Closed: "bg-neutral-100 text-neutral-600",
};

export default function GroupInquiriesPage() {
  const [rows, setRows] = useState<GroupRow[]>(INITIAL_ROWS);
  const [search, setSearch] = useState("");
  const [property, setProperty] = useState("");
  const [status, setStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // View modal state
  const [selectedGroup, setSelectedGroup] = useState<GroupRow | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "active" | "left">("details");

  // Form state
  const [form, setForm] = useState({
    name: "",
    category: "Property",
    listing: "",
    targetMembers: "",
    startDate: "",
    description: "",
  });

  const handleViewGroup = (group: GroupRow) => {
    setSelectedGroup(group);
    setActiveTab("details");
    setIsViewOpen(true);
  };

  const handleAddGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.listing) return;

    const nextId = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
    const newRow: GroupRow = {
      id: nextId,
      name: form.name.trim(),
      property: form.listing,
      category: form.category,
      buyers: form.targetMembers || "0",
      date: form.startDate ? new Date(form.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Upcoming",
    };
    setRows([newRow, ...rows]);
    setForm({ name: "", category: "Property", listing: "", targetMembers: "", startDate: "", description: "" });
    setIsModalOpen(false);
  };

  const filteredRows = rows.filter((r) => {
    const matchesSearch = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.property.toLowerCase().includes(search.toLowerCase());
    const matchesProperty = !property || r.property === property;
    const matchesStatus = !status || r.status === status;
    return matchesSearch && matchesProperty && matchesStatus;
  });

  const availableListings = form.category === "Property" ? PROPERTY_LISTINGS : VEHICLE_LISTINGS;

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
              placeholder="Search by group or listing name"
              className="w-full pl-10 pr-4 py-2.5 border-2 border-neutral-200 rounded-xl text-sm focus:ring-4 focus:ring-primary-100 focus:border-primary-400 outline-none transition-all"
            />
          </div>
          <ThemedSelect
            value={property}
            onChange={setProperty}
            placeholder="All Listings"
            options={[
              { value: "", label: "All Listings" },
              ...[...PROPERTY_LISTINGS, ...VEHICLE_LISTINGS].map((l) => ({ value: l, label: l }))
            ]}
            className="min-w-[180px]"
          />
          <ThemedSelect
            value={status}
            onChange={setStatus}
            placeholder="Status"
            options={[
              { value: "", label: "All Status" },
              { value: "Active", label: "Active" },
              { value: "In Negotiation", label: "In Negotiation" },
              { value: "Upcoming", label: "Upcoming" },
              { value: "Closed", label: "Closed" },
            ]}
            className="min-w-[150px]"
          />
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary-500/25"
        >
          <Plus className="w-4 h-4" />
          Add Groups
        </button>
      </div>

      {/* Add Group Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-r from-primary-500 to-primary-600">
            {/* Modal Header */}
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/80 mb-1">Group Management</p>
                  <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                    Create New Group
                  </h2>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleAddGroup} className="p-6 space-y-5 bg-white rounded-b-2xl">
              {/* Group Name */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary-500" />
                    Group Name
                  </span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Skyline Heights Buyers Group"
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400"
                  required
                />
              </div>

              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Category</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, category: "Property", listing: "" })}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                      form.category === "Property"
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                    }`}
                  >
                    <Building2 className="w-5 h-5" />
                    Property
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, category: "Vehicle", listing: "" })}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                      form.category === "Vehicle"
                        ? "border-violet-500 bg-violet-50 text-violet-700"
                        : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                    }`}
                  >
                    <Car className="w-5 h-5" />
                    Vehicle
                  </button>
                </div>
              </div>

              {/* Select Listing */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  <span className="flex items-center gap-2">
                    {form.category === "Property" ? <Building2 className="w-4 h-4 text-primary-500" /> : <Car className="w-4 h-4 text-violet-500" />}
                    Select {form.category}
                  </span>
                </label>
                <ThemedSelect
                  value={form.listing}
                  onChange={(val) => setForm({ ...form, listing: val })}
                  placeholder={`Choose a ${form.category.toLowerCase()}...`}
                  options={[
                    { value: "", label: `Choose a ${form.category.toLowerCase()}...` },
                    ...availableListings.map((l) => ({ value: l, label: l }))
                  ]}
                />
              </div>

              {/* Target Members & Start Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    <span className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary-500" />
                      Target Members
                    </span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.targetMembers}
                    onChange={(e) => setForm({ ...form, targetMembers: e.target.value })}
                    placeholder="e.g. 50"
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary-500" />
                      Start Date
                    </span>
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary-500" />
                    Description (Optional)
                  </span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Brief description about this group..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-neutral-300 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold shadow-lg shadow-primary-500/25 hover:from-primary-600 hover:to-primary-700 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/80">
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Group Name</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Listing</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Members</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Start Date</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Status</th>
                <th className="text-right py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((r) => (
                <tr key={r.id} className="border-b border-neutral-100 hover:bg-primary-50/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        r.category === "Property" ? "bg-primary-100" : "bg-violet-100"
                      }`}>
                        <Users className={`w-4 h-4 ${r.category === "Property" ? "text-primary-600" : "text-violet-600"}`} />
                      </div>
                      <span className="font-medium text-neutral-800">{r.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      {r.category === "Property" ? (
                        <Building2 className="w-4 h-4 text-primary-500" />
                      ) : (
                        <Car className="w-4 h-4 text-violet-500" />
                      )}
                      <span className="text-sm text-neutral-600">{r.property}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-sm font-semibold text-primary-600">{r.buyers}</td>
                  <td className="py-3.5 px-4 text-sm text-neutral-600">{r.date}</td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[r.status] || "bg-neutral-100 text-neutral-600"}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={() => handleViewGroup(r)}
                      className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
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
          <span>Showing {filteredRows.length} of {rows.length}</span>
          <button className="px-4 py-1.5 rounded-lg border border-neutral-300 hover:bg-white hover:border-primary-300 transition-colors">Next →</button>
        </div>
      </div>

      {/* View Group Details Modal */}
      {isViewOpen && selectedGroup && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md overflow-y-auto py-8">
          <div className={`w-full max-w-4xl rounded-2xl shadow-2xl relative mx-4 ${selectedGroup.category === "Property" ? "bg-gradient-to-r from-primary-500 to-primary-600" : "bg-gradient-to-r from-violet-500 to-violet-600"}`}>
            {/* Modal Header */}
            <div className="px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/80 mb-1">Group Details</p>
                    <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                      {selectedGroup.name}
                    </h2>
                  </div>
                </div>
                <button
                  onClick={() => setIsViewOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white border-b border-neutral-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`flex-1 px-6 py-3.5 text-sm font-semibold transition-colors relative ${
                    activeTab === "details" ? "text-primary-600" : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <FileText className="w-4 h-4" />
                    Group Details
                  </span>
                  {activeTab === "details" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("active")}
                  className={`flex-1 px-6 py-3.5 text-sm font-semibold transition-colors relative ${
                    activeTab === "active" ? "text-emerald-600" : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <UserCheck className="w-4 h-4" />
                    Active Members ({selectedGroup.activeMembers?.length || 0})
                  </span>
                  {activeTab === "active" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("left")}
                  className={`flex-1 px-6 py-3.5 text-sm font-semibold transition-colors relative ${
                    activeTab === "left" ? "text-red-600" : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <UserMinus className="w-4 h-4" />
                    Left Members ({selectedGroup.leftMembers?.length || 0})
                  </span>
                  {activeTab === "left" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[60vh] overflow-y-auto bg-white">
              {/* Details Tab */}
              {activeTab === "details" && (
                <div className="space-y-6">
                  {/* Status & Category */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${STATUS_STYLES[selectedGroup.status]}`}>
                        {selectedGroup.status}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                        selectedGroup.category === "Property" ? "bg-primary-100 text-primary-700" : "bg-violet-100 text-violet-700"
                      }`}>
                        {selectedGroup.category === "Property" ? <Building2 className="w-4 h-4" /> : <Car className="w-4 h-4" />}
                        {selectedGroup.category}
                      </span>
                    </div>
                    <span className="text-sm text-neutral-500">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Started: {selectedGroup.date}
                    </span>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-primary-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-primary-600 mb-1">
                        <Users className="w-4 h-4" />
                        <span className="text-xs font-medium">Current Members</span>
                      </div>
                      <p className="text-2xl font-bold text-primary-700">{selectedGroup.buyers}</p>
                      <p className="text-xs text-primary-500">of {selectedGroup.targetMembers} target</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-emerald-600 mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs font-medium">Current Discount</span>
                      </div>
                      <p className="text-2xl font-bold text-emerald-700">{selectedGroup.currentDiscount}</p>
                      <p className="text-xs text-emerald-500">bulk buying discount</p>
                    </div>
                    <div className="bg-violet-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-violet-600 mb-1">
                        <IndianRupee className="w-4 h-4" />
                        <span className="text-xs font-medium">Expected Savings</span>
                      </div>
                      <p className="text-2xl font-bold text-violet-700">{selectedGroup.expectedSavings}</p>
                      <p className="text-xs text-violet-500">per member</p>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-amber-600 mb-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs font-medium">End Date</span>
                      </div>
                      <p className="text-2xl font-bold text-amber-700">{selectedGroup.endDate?.split(",")[0] || "TBD"}</p>
                      <p className="text-xs text-amber-500">deadline</p>
                    </div>
                  </div>

                  {/* Listing Info */}
                  <div className="bg-neutral-50 rounded-xl p-4">
                    <label className="text-sm font-medium text-neutral-500 mb-2 block">Associated Listing</label>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        selectedGroup.category === "Property" ? "bg-primary-100" : "bg-violet-100"
                      }`}>
                        {selectedGroup.category === "Property" ? (
                          <Building2 className="w-5 h-5 text-primary-600" />
                        ) : (
                          <Car className="w-5 h-5 text-violet-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-800">{selectedGroup.property}</p>
                        <p className="text-sm text-neutral-500">{selectedGroup.category}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-sm font-medium text-neutral-500 mb-2 block">Description</label>
                    <p className="text-neutral-700">{selectedGroup.description || "No description available"}</p>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-neutral-500">Member Progress</label>
                      <span className="text-sm font-semibold text-primary-600">
                        {Math.round((parseInt(selectedGroup.buyers) / (selectedGroup.targetMembers || 1)) * 100)}%
                      </span>
                    </div>
                    <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all"
                        style={{ width: `${Math.min((parseInt(selectedGroup.buyers) / (selectedGroup.targetMembers || 1)) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Active Members Tab */}
              {activeTab === "active" && (
                <div className="space-y-4">
                  {selectedGroup.activeMembers && selectedGroup.activeMembers.length > 0 ? (
                    <div className="space-y-3">
                      {selectedGroup.activeMembers.map((member) => (
                        <div key={member.id} className="bg-neutral-50 rounded-xl p-4 flex items-center justify-between hover:bg-emerald-50/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                              <span className="text-emerald-700 font-bold text-lg">
                                {member.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-neutral-800">{member.name}</p>
                              <div className="flex items-center gap-4 mt-1">
                                <span className="text-xs text-neutral-500 flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {member.phone}
                                </span>
                                <span className="text-xs text-neutral-500 flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {member.email}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                              <CheckCircle2 className="w-3 h-3" />
                              Active
                            </span>
                            <p className="text-xs text-neutral-500 mt-1 flex items-center justify-end gap-1">
                              <MapPin className="w-3 h-3" />
                              {member.location}
                            </p>
                            <p className="text-xs text-neutral-400">Joined: {member.joinedDate}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-neutral-400" />
                      </div>
                      <p className="text-neutral-500">No active members yet</p>
                    </div>
                  )}
                </div>
              )}

              {/* Left Members Tab */}
              {activeTab === "left" && (
                <div className="space-y-4">
                  {selectedGroup.leftMembers && selectedGroup.leftMembers.length > 0 ? (
                    <div className="space-y-3">
                      {selectedGroup.leftMembers.map((member) => (
                        <div key={member.id} className="bg-neutral-50 rounded-xl p-4 flex items-center justify-between hover:bg-red-50/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                              <span className="text-red-700 font-bold text-lg">
                                {member.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-neutral-800">{member.name}</p>
                              <div className="flex items-center gap-4 mt-1">
                                <span className="text-xs text-neutral-500 flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {member.phone}
                                </span>
                                <span className="text-xs text-neutral-500 flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {member.email}
                                </span>
                              </div>
                              {member.leftReason && (
                                <p className="text-xs text-red-500 mt-1.5 italic">
                                  Reason: {member.leftReason}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                              <XCircle className="w-3 h-3" />
                              Left
                            </span>
                            <p className="text-xs text-neutral-500 mt-1 flex items-center justify-end gap-1">
                              <MapPin className="w-3 h-3" />
                              {member.location}
                            </p>
                            <p className="text-xs text-neutral-400">Left: {member.leftDate}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                      </div>
                      <p className="text-neutral-600 font-medium">No members have left</p>
                      <p className="text-sm text-neutral-400">All members are still active in this group</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <Users className="w-4 h-4" />
                <span>{selectedGroup.activeMembers?.length || 0} active, {selectedGroup.leftMembers?.length || 0} left</span>
              </div>
              <button
                onClick={() => setIsViewOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold shadow-lg shadow-primary-500/25 hover:from-primary-600 hover:to-primary-700 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
