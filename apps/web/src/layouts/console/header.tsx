import { OrganizationSwitcher } from "@raypx/auth/organization";
import Link from "next/link";

type HeaderProps = {
  slug?: string;
};

export function Header({ slug }: HeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-6 py-4">
        <nav aria-label="Console navigation" className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="font-semibold text-xl">Raypx</h1>
            <div className="hidden space-x-4 md:flex">
              <Link
                aria-label="Go to console dashboard"
                className="rounded px-2 py-1 text-sm transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                href="/console"
              >
                Dashboard
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <OrganizationSwitcher size="icon" slug={slug} />
          </div>
        </nav>
      </div>
    </header>
  );
}
