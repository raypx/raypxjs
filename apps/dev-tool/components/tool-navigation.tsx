"use client";

import { Activity, Code, Database, Globe, Mail, Palette, Settings, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: Activity,
    description: "Service status overview",
  },
  {
    name: "Environment",
    href: "/environment",
    icon: Settings,
    description: "Environment variables",
  },
  {
    name: "Components",
    href: "/components",
    icon: Palette,
    description: "UI component library",
  },
  {
    name: "Database",
    href: "/database",
    icon: Database,
    description: "Database management",
  },
  {
    name: "API Testing",
    href: "/api",
    icon: Zap,
    description: "API endpoint testing",
  },
  {
    name: "Email",
    href: "/email",
    icon: Mail,
    description: "Email templates",
  },
  {
    name: "i18n",
    href: "/i18n",
    icon: Globe,
    description: "Internationalization",
  },
  {
    name: "Logs",
    href: "/logs",
    icon: Code,
    description: "Application logs",
  },
];

export function ToolNavigation() {
  const pathname = usePathname();

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-gray-200 border-b p-4">
        <h2 className="font-medium text-gray-900 text-sm">Development Tools</h2>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <Link
                  className={`group flex items-center rounded-md px-3 py-2 font-medium text-sm transition-colors ${
                    isActive
                      ? "border-blue-200 bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }
                  `}
                  href={item.href}
                >
                  <Icon
                    className={`mr-3 h-4 w-4 flex-shrink-0 ${isActive ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"}
                    `}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate">{item.name}</div>
                    <div className="truncate text-gray-500 text-xs">{item.description}</div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
