
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kardb.com"),
  title: {
    default: "KARDB | Equity Research & Financial Analysis",
    template: "%s | KARDB",
  },
  description:
    "KARDB is developing a financial research platform focused on fundamental analysis, financial statements, company valuation, ratio analysis, peer comparison, industry research and market behaviour.",
  applicationName: "KARDB",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KARDB | Equity Research & Financial Analysis",
    description:
      "Explore business fundamentals, financial statements, valuation concepts and structured equity research with KARDB.",
    url: "https://kardb.com",
    siteName: "KARDB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
