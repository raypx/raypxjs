import type { ReactNode } from "react";
import { Footer } from "@/layouts/landing/footer";
import { Header } from "@/layouts/landing/header";

export type PublicLayoutProps = {
  children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
