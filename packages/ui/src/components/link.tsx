"use client";

import NextLink from "next/link";
import type { ComponentProps, ForwardedRef } from "react";
import { forwardRef } from "react";

export interface LinkProps extends ComponentProps<typeof NextLink> {
  /**
   * Whether to open the link in a new tab
   */
  external?: boolean;
  /**
   * Custom className for styling
   */
  className?: string;
}

/**
 * Link component that wraps Next.js Link with additional functionality
 *
 * @example
 * ```tsx
 * <Link href="/dashboard">Dashboard</Link>
 * <Link href="https://example.com" external>External Link</Link>
 * ```
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ external, className, children, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
    // External links
    if (external || (typeof props.href === "string" && props.href.startsWith("http"))) {
      return (
        <a
          className={className}
          href={typeof props.href === "string" ? props.href : props.href?.toString()}
          ref={ref}
          rel="noopener noreferrer"
          target="_blank"
          {...(props as ComponentProps<"a">)}
        >
          {children}
        </a>
      );
    }

    // Internal links using Next.js Link
    return (
      <NextLink className={className} ref={ref} {...props}>
        {children}
      </NextLink>
    );
  }
);

Link.displayName = "Link";
