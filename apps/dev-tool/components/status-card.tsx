"use client";

import { CheckCircle, Loader2, XCircle } from "lucide-react";

type ServiceStatus = "online" | "offline" | "checking" | "error";

type StatusCardProps = {
  name: string;
  status: ServiceStatus;
  description?: string;
  details?: string;
};

const statusConfig = {
  online: {
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    label: "Online",
  },
  offline: {
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    label: "Offline",
  },
  checking: {
    icon: Loader2,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    label: "Checking...",
  },
  error: {
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    label: "Error",
  },
};

export function StatusCard({ name, status, description, details }: StatusCardProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`rounded-lg border bg-white ${config.borderColor} p-4 shadow-sm`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`rounded-full p-2 ${config.bgColor}`}>
            <Icon
              className={`h-5 w-5 ${config.color} ${status === "checking" ? "animate-spin" : ""}`}
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 text-sm">{name}</h3>
            {description && <p className="text-gray-500 text-xs">{description}</p>}
          </div>
        </div>
        <span className={`font-medium text-xs ${config.color}`}>{config.label}</span>
      </div>

      {details && (
        <div className="mt-3 border-gray-100 border-t pt-3">
          <p className="text-gray-600 text-xs">{details}</p>
        </div>
      )}
    </div>
  );
}
