"use client";

import { Button } from "@raypx/ui/components/button";
import { cn } from "@raypx/ui/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import { LocaleLink } from "@/components/link";

type BackButtonSmallProps = {
  href?: string;
  className?: string;
};

export default function BackButtonSmall({ href, className }: BackButtonSmallProps) {
  return (
    <Button asChild className={cn("size-8 px-0", className)} size="sm" variant="outline">
      <LocaleLink href={href || "/"}>
        <ArrowLeftIcon className="size-4" />
      </LocaleLink>
    </Button>
  );
}
