import type { ReactNode } from "react";
import { Footer } from "@/layouts/landing/footer";
import { Header } from "@/layouts/landing/header";

export interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
