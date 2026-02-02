"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Building2,
  Users,
  Handshake,
  Search,
  Bell,
  LogOut,
  Store,
} from "lucide-react";

const SIDEBAR_LINKS: { href: string; label: string; icon: React.ElementType }[] = [
  { href: "/vendor", label: "Dashboard", icon: LayoutDashboard },
  { href: "/vendor/listings", label: "Listings", icon: Building2 },
  { href: "/vendor/inquiries", label: "Group Inquiries", icon: Users },
  { href: "/vendor/offers", label: "Offers & Deals", icon: Handshake },
];

const TITLES: Record<string, string> = {
  "/vendor": "Dashboard",
  "/vendor/listings": "Listings",
  "/vendor/listings/properties": "Property Listings",
  "/vendor/listings/properties/add": "Add New Property",
  "/vendor/listings/vehicles": "Vehicle Listings",
  "/vendor/inquiries": "Group Inquiries",
  "/vendor/offers": "Offers & Deals",
};

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const isLogin = pathname === "/vendor/login";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isLogin) return;
    const ok = typeof window !== "undefined" && window.sessionStorage.getItem("nearhood_vendor");
    if (!ok) router.replace("/vendor/login");
  }, [mounted, isLogin, router]);

  if (!mounted) return null;
  if (isLogin) return <>{children}</>;

  const title = TITLES[pathname || ""] || "Dashboard";

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-primary-50/50 via-white to-primary-50/30">
      {/* Sidebar - purple gradient */}
      <aside className="w-60 flex-shrink-0 bg-gradient-to-b from-primary-600 to-primary-700 flex flex-col shadow-xl z-10">
        <div className="p-4 flex items-center gap-3 border-b border-white/10">
          <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
            <Store className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-white block" style={{ fontFamily: "var(--font-display)" }}>Nearhood</span>
            <span className="text-[10px] text-white/70 uppercase tracking-wider">Vendor Portal</span>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {SIDEBAR_LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/vendor" && pathname?.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active 
                    ? "bg-white text-primary-700 shadow-md" 
                    : "text-white/80 hover:bg-white/15 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>
        
        {/* Mini Breadcrumb for Listings */}
        {pathname?.startsWith("/vendor/listings/") && (
          <div className="px-3 pb-3">
            <div className="bg-white/10 rounded-lg px-3 py-2">
              <p className="text-[10px] text-white/60 uppercase tracking-wider mb-1">Current Category</p>
              <p className="text-sm text-white font-medium">
                {pathname.includes("/properties") ? "Properties" : pathname.includes("/vehicles") ? "Vehicles" : ""}
              </p>
            </div>
          </div>
        )}
        
        {/* Sidebar Footer */}
        <div className="p-3 border-t border-white/10">
          <Link href="/" className="flex items-center gap-2 px-3 py-2 text-white/70 hover:text-white text-sm transition-colors">
            ← Back to Main Site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="h-16 flex-shrink-0 bg-white/80 backdrop-blur-sm border-b border-neutral-200 flex items-center justify-between px-6 sticky top-0 z-20">
          <h1 className="text-xl font-bold text-neutral-800" style={{ fontFamily: "var(--font-display)" }}>
            {title}
          </h1>
          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-xl text-neutral-500 hover:bg-primary-50 hover:text-primary-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2.5 rounded-xl text-neutral-500 hover:bg-primary-50 hover:text-primary-600 transition-colors relative">
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></div>
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-neutral-200 mx-1"></div>
            <button
              onClick={() => {
                if (typeof window !== "undefined") window.sessionStorage.removeItem("nearhood_vendor");
                router.push("/vendor/login");
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-neutral-600 hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
