import type { ReactNode } from "react";
import BackButtonSmall from "@/components/shared/back-button-small";
import { AuthLayout as Layout } from "../../layouts/auth";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Layout>
      <BackButtonSmall className="absolute top-6 left-6" />
      {children}
    </Layout>
  );
}
