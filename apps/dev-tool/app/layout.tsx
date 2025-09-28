import type { Metadata } from "next";

import "@raypx/ui/globals.css";

export const metadata: Metadata = {
  title: "Raypx Dev Tool",
  description: "Development tools for Raypx applications",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
