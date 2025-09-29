"use client";

import { useAuthenticate } from "../../core/hooks/use-authenticate";
/**
 * Redirects the user to the sign-in page
 *
 * Renders nothing and automatically redirects the current user to the authentication
 * sign-in page. Useful for protecting routes that require authentication or
 * redirecting users to sign in from various parts of the application.
 */
export function RedirectToSignIn(): null {
  useAuthenticate({ authView: "SIGN_IN" });
  return null;
}
