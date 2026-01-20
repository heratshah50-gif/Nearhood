"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Building2,
  HelpCircle,
  Users,
  Phone,
  ChevronRight,
  Search,
  MapPin,
  Mic,
  Bell,
  User,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Properties", href: "/properties", icon: Building2 },
  { label: "How It Works", href: "#how-it-works", icon: HelpCircle },
  { label: "About", href: "/about", icon: Users },
  { label: "Contact", href: "/contact", icon: Phone },
];

interface HeaderProps {
  onLoginClick: () => void;
  hideNavigation?: boolean;
  searchProps?: {
    selectedCity: string;
    onCityChange: (city: string) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    locationOptions?: string[];
  };
}

export default function Header({ onLoginClick, hideNavigation = false, searchProps }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-lg py-0"
            : "bg-white/80 backdrop-blur-md py-0 border-b border-neutral-100"
        }`}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between gap-4 py-0.5 flex-nowrap">
            {/* Logo */}
            <Link href="/" className="flex items-center group flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Nearhood"
                width={480}
                height={140}
                className="h-20 sm:h-24 md:h-28 w-auto"
                priority
              />
            </Link>

            {/* Search Bar in Header when hideNavigation is true */}
            {hideNavigation && searchProps && (
              <div className="flex-1 min-w-0 px-2 sm:px-4">
                <div className="rounded-3xl bg-white shadow-lg shadow-primary-100/70 border border-primary-100/70 px-4 py-3 md:px-6 md:py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                  {/* City */}
                  <div className="w-full md:w-[32%]">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400 mb-1">
                      City
                    </p>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-500" />
                      <select
                        value={searchProps.selectedCity}
                        onChange={(e) => searchProps.onCityChange(e.target.value)}
                        className="w-full pl-9 pr-8 py-2.5 rounded-2xl border border-primary-100 bg-primary-50/40 text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-400 appearance-none"
                        title={searchProps.locationOptions ? "Location in Ahmedabad" : "City"}
                      >
                        {searchProps.locationOptions ? (
                          <>
                            <option value="">All Locations</option>
                            {searchProps.locationOptions.map((loc) => (
                              <option key={loc} value={loc}>
                                {loc}
                              </option>
                            ))}
                          </>
                        ) : (
                          <>
                            <option value="Ahmedabad">Ahmedabad</option>
                            <option value="New Delhi">New Delhi</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Gurgaon">Gurgaon</option>
                            <option value="Pune">Pune</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  {/* Select Property / Keyword */}
                  <div className="flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400 mb-1">
                      Select Property
                    </p>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
                  <input
                    type="text"
                    placeholder="Search by project, location or keyword"
                    value={searchProps.searchQuery}
                    onChange={(e) => searchProps.onSearchChange(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-2xl border border-neutral-200 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-300"
                  />
                    </div>
                  </div>

                  {/* Budget & Filters + Search */}
                  <div className="w-full md:w-auto flex items-stretch md:items-center gap-2 md:gap-3">
                    <div className="flex-1 md:flex-none">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400 mb-1">
                        Budget &amp; More Filters
                      </p>
                      <select className="w-full md:w-[180px] px-3 py-2.5 rounded-2xl border border-neutral-200 bg-white text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-300">
                        <option>Budget &amp; More Filters</option>
                        <option>Under ₹1 Cr</option>
                        <option>₹1-5 Cr</option>
                        <option>₹5-10 Cr</option>
                        <option>Above ₹10 Cr</option>
                      </select>
                    </div>

                    <button className="mt-5 md:mt-5 md:self-end px-5 md:px-6 py-3 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:from-primary-600 hover:to-primary-700 transition-all flex-shrink-0">
                      <Search className="w-4 h-4" />
                      <span>Search</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!hideNavigation && (
              <>
                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="px-3 py-1 text-sm font-medium rounded-lg transition-all duration-200 text-neutral-600 hover:text-primary-700 hover:bg-primary-50"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Desktop CTA Buttons */}
                <div className="hidden lg:flex items-center gap-3">
                  <Link
                    href="#developers"
                    className="text-sm font-medium text-neutral-600 hover:text-primary-700 transition-colors"
                  >
                    For Developers
                  </Link>
                  <button
                    onClick={onLoginClick}
                    className="px-4 py-1.5 text-sm font-semibold rounded-full bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Login
                  </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden p-2.5 rounded-xl text-neutral-700 hover:bg-neutral-100 transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Right side buttons when navigation is hidden */}
            {hideNavigation && (
              <div className="flex items-center gap-3 flex-shrink-0">
                <button className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-primary-700 transition-colors">
                  Corporate
                </button>
                <button className="p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors">
                  <User className="w-5 h-5" />
                </button>
                <button
                  onClick={onLoginClick}
                  className="px-4 py-1.5 text-sm font-semibold rounded-full bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Login
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && !hideNavigation && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-white z-[200] lg:hidden shadow-2xl"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-5 border-b border-neutral-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <span
                    className="text-lg font-bold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    <span className="text-primary-700">Near</span>
                    <span className="text-neutral-800">hood</span>
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Menu Items */}
              <nav className="p-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-neutral-100 group-hover:bg-primary-100 flex items-center justify-center transition-colors">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 transition-colors" />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Mobile CTA */}
              <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-neutral-100 bg-white">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLoginClick();
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  Login / Sign Up
                </button>
                <Link
                  href="#developers"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full py-3 mt-3 text-center text-neutral-600 font-medium hover:text-primary-700 transition-colors"
                >
                  For Developers
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
