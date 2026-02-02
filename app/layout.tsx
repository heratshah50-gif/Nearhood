import type { Metadata } from "next";
import "./globals.css";

// Use system fonts to avoid Google Fonts fetch failures (network/firewall issues)
const systemFontStack = "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

export const metadata: Metadata = {
  title: "Nearhood | Buy Together. Save Together.",
  description: "Join thousands of smart buyers unlocking group discounts on premium properties. Real estate group buying platform for maximum savings.",
  keywords: ["real estate", "group buying", "property discount", "home buying", "collective purchasing", "Nearhood"],
  authors: [{ name: "Nearhood" }],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    title: "Nearhood | Buy Together. Save Together.",
    description: "Join thousands of smart buyers unlocking group discounts on premium properties.",
    type: "website",
    locale: "en_IN",
    siteName: "Nearhood",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nearhood | Buy Together. Save Together.",
    description: "Join thousands of smart buyers unlocking group discounts on premium properties.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" style={{ backgroundColor: "#FFFFFF" }}>
      <body
        className="antialiased"
        style={{
          fontFamily: systemFontStack,
          backgroundColor: "#FFFFFF",
          margin: 0,
          padding: 0,
          ["--font-display" as string]: systemFontStack,
          ["--font-body" as string]: systemFontStack,
        }}
      >
        {children}
      </body>
    </html>
  );
}
