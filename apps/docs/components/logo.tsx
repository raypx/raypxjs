import { cn } from "@raypx/ui/lib/utils";
import Image from "next/image";

type LogoProps = {
  size?: 16 | 24 | 32 | 48 | 64 | 128 | 256;
  className?: string;
  priority?: boolean;
};

// Map size to optimized image
const getLogoSrc = (size: number) => {
  if (size <= 32) {
    return "/logo-32.png";
  }
  if (size <= 64) {
    return "/logo-64.png";
  }
  if (size <= 128) {
    return "/logo-128.png";
  }
  if (size <= 256) {
    return "/logo-256.png";
  }
  return "/logo-512.png";
};

export function Logo({ size = 24, className, priority = false }: LogoProps) {
  return (
    <Image
      alt="Logo"
      className={cn("rounded-full", className)}
      height={size}
      priority={priority}
      sizes={`${size}px`}
      src={getLogoSrc(size)}
      width={size}
    />
  );
}
