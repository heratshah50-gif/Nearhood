import { type ClassValue, clsx } from "clsx";

// Simple class name merger (we'll add clsx-like functionality)
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

// Format currency in Indian Rupee format
export function formatIndianCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format currency in Crores (₹ X.XX Cr)
export function formatCrores(amount: number): string {
  const crores = amount / 10000000;
  if (crores >= 1) {
    return `₹ ${crores.toFixed(2)} Cr`;
  }
  const lakhs = amount / 100000;
  return `₹ ${lakhs.toFixed(2)} L`;
}

// Format number with Indian locale
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-IN").format(num);
}

// Calculate savings percentage
export function calculateSavingsPercentage(original: number, discounted: number): number {
  return Math.round(((original - discounted) / original) * 100);
}

// Format phone number for display
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
}

// Debounce function for search inputs
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Generate initials from name
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Check if device is mobile (client-side only)
export function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}


