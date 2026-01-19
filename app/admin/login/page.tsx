"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, Lock, Mail, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    if (email === "admin@nearhood.com" && password === "admin123") {
      if (typeof window !== "undefined") window.sessionStorage.setItem("nearhood_admin", "1");
      router.push("/admin");
    } else {
      setError("Invalid email or password. Use admin@nearhood.com / admin123");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[#1e3a5f] font-bold text-xl">
            <Building2 className="w-8 h-8" />
            <span>Nearhood</span> <span className="text-neutral-500">Admin</span>
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-8">
          <h1 className="text-xl font-bold text-neutral-800 mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Admin Login
          </h1>
          <p className="text-neutral-500 text-sm mb-6">Sign in to manage properties, groups, and negotiations.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nearhood.com"
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] outline-none"
                  required
                />
              </div>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign in"}
            </button>
          </form>
          <p className="mt-4 text-center text-neutral-500 text-xs">
            Demo: admin@nearhood.com / admin123
          </p>
        </div>
        <p className="text-center mt-6">
          <Link href="/" className="text-[#1e3a5f] hover:underline text-sm">← Back to Nearhood</Link>
        </p>
      </div>
    </div>
  );
}
