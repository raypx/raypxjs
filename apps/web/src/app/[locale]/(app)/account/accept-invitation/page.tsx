import { AuthView } from "@raypx/auth/core";
import { createMetadata } from "@raypx/seo";
import type { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> =>
  createMetadata({
    title: "Accept Invitation",
  });

export default function AcceptInvitationPage() {
  return <AuthView view="ACCEPT_INVITATION" />;
}
