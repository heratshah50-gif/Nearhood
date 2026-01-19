"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Building2,
  Users,
  Handshake,
  User,
  CreditCard,
  FileText,
  Settings,
  Search,
  Grid3X3,
  Home,
} from "lucide-react";

const SIDEBAR_LINKS: { href: string; label: string; icon: React.ElementType }[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/property-listings", label: "Property Listings", icon: Building2 },
  { href: "/admin/groups", label: "Groups Management", icon: Users },
  { href: "/admin/negotiations", label: "Negotiations", icon: Handshake },
  { href: "/admin/users", label: "Users", icon: User },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/reports", label: "Reports", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

const TITLES: Record<string, string> = {
  "/admin": "Admin Dashboard",
  "/admin/property-listings": "Property Listings Management",
  "/admin/groups": "Group Management",
  "/admin/negotiations": "Negotiation Management",
  "/admin/users": "Users",
  "/admin/payments": "Payments",
  "/admin/reports": "Reports",
  "/admin/settings": "Settings",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isLogin) return;
    const ok = typeof window !== "undefined" && window.sessionStorage.getItem("nearhood_admin");
    if (!ok) router.replace("/admin/login");
  }, [mounted, isLogin, router]);

  if (!mounted) return null;
  if (isLogin) return <>{children}</>;

  const title = TITLES[pathname || ""] || "Admin Dashboard";

  return (
    <div className="min-h-screen flex bg-neutral-100">
      {/* Sidebar - dark blue */}
      <aside className="w-60 flex-shrink-0 bg-[#1e3a5f] flex flex-col">
        <div className="p-4 flex items-center gap-2 border-b border-white/10">
          <Home className="w-6 h-6 text-white/90" />
          <span className="font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Admin Dashboard</span>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {SIDEBAR_LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/admin" && pathname?.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active ? "bg-[#3b82f6]/80 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header - light grey */}
        <header className="h-14 flex-shrink-0 bg-white border-b border-neutral-200 flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold text-neutral-800" style={{ fontFamily: "var(--font-display)" }}>
            {title}
          </h1>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 transition-colors">
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                if (typeof window !== "undefined") window.sessionStorage.removeItem("nearhood_admin");
                router.push("/admin/login");
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors text-sm"
            >
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
