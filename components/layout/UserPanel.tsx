"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Building2,
  Users,
  Phone,
  Bell,
  GitCompare,
  CreditCard,
  Tag,
  Heart,
  LogOut,
  Settings,
  User,
} from "lucide-react";

interface UserInfo {
  phoneNumber: string;
  name: string;
}

interface UserPanelProps {
  children: React.ReactNode;
}

export default function UserPanel({ children }: UserPanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserLogin = () => {
      if (typeof window !== "undefined") {
        const userStr = window.sessionStorage.getItem("nearhood_user");
        if (userStr) {
          try {
            setUserInfo(JSON.parse(userStr));
          } catch (e) {
            setUserInfo(null);
          }
        } else {
          setUserInfo(null);
        }
      }
      setIsLoading(false);
    };

    checkUserLogin();
    window.addEventListener("userLoggedIn", checkUserLogin);
    return () => window.removeEventListener("userLoggedIn", checkUserLogin);
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem("nearhood_user");
      window.sessionStorage.removeItem("nearhood_admin");
      window.sessionStorage.removeItem("nearhood_vendor");
    }
    setUserInfo(null);
    router.push("/");
  };

  const formatPhoneNumber = (phone: string) => {
    if (phone.length === 10) {
      return `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;
    }
    return `+91 ${phone}`;
  };

  // Redirect to home if not logged in (after loading)
  useEffect(() => {
    if (!isLoading && !userInfo) {
      router.push("/");
    }
  }, [userInfo, isLoading, router]);

  // Don't render anything if loading or not logged in
  if (isLoading || !userInfo) {
    return null;
  }

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Listings", href: "/listings", icon: Building2 },
    { label: "About Us", href: "/about", icon: Users },
    { label: "Contact Us", href: "/contact", icon: Phone },
  ];

  const communityItems = [
    { label: "Your Groups", href: "/user/groups", icon: Users },
    { label: "Subscribe", href: "/user/subscribe", icon: Bell },
    { label: "Compare", href: "/compare", icon: GitCompare },
  ];

  const activityItems = [
    { label: "Transactions", href: "/user/transactions", icon: CreditCard },
    { label: "Coupons", href: "/user/coupons", icon: Tag },
    { label: "Shortlisted", href: "/user/shortlisted", icon: Heart },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-neutral-200 flex flex-col fixed left-0 top-[130px] bottom-0 overflow-y-auto z-40">
        {/* User Info Card */}
        <div className="p-3 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-neutral-200 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-neutral-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-neutral-900 truncate">
                {userInfo.name}
              </p>
              <p className="text-[10px] text-neutral-500 truncate">
                {formatPhoneNumber(userInfo.phoneNumber)}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-3">
          <div className="px-2 mb-3">
            <h3 className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5 px-2">
              Navigation
            </h3>
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-2 px-2 py-2 rounded-lg text-xs transition-colors mb-0.5 ${
                    active
                      ? "bg-primary-50 text-primary-700 font-medium"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Community Section */}
          <div className="px-2 mb-3">
            <h3 className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5 px-2">
              Community
            </h3>
            {communityItems.map((item) => {
              const IconComponent = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-2 px-2 py-2 rounded-lg text-xs transition-colors mb-0.5 ${
                    active
                      ? "bg-primary-50 text-primary-700 font-medium"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Activity Section */}
          <div className="px-2 mb-3">
            <h3 className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5 px-2">
              Activity
            </h3>
            {activityItems.map((item) => {
              const IconComponent = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-2 px-2 py-2 rounded-lg text-xs transition-colors mb-0.5 ${
                    active
                      ? "bg-primary-50 text-primary-700 font-medium"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Settings Section */}
          <div className="px-2 mb-3">
            <h3 className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5 px-2">
              Settings
            </h3>
            <Link
              href="/user/settings"
              className={`flex items-center gap-2 px-2 py-2 rounded-lg text-xs transition-colors mb-0.5 ${
                isActive("/user/settings")
                  ? "bg-primary-50 text-primary-700 font-medium"
                  : "text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Settings</span>
            </Link>
          </div>
        </div>

        {/* Logout Button */}
        <div className="p-3 border-t border-neutral-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-56 min-h-screen">
        <div className="container mx-auto px-4 pt-12 pb-6">
          {children}
        </div>
      </main>
    </div>
  );
}
