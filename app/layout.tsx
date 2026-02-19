import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CryptoLogic LLC — Specialized Engineering for Complex Domains",
  description: "High-performance infrastructure, distributed systems, and advanced cryptography for modern enterprises.",
  icons: {
    icon: "/images/cryptologic.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
