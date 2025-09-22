"use client";

import { Loader2 } from "@raypx/ui/components/icons";
import { useEffect, useRef } from "react";
import { useAuth } from "../../core/hooks/use-auth";
import { useOnSuccessTransition } from "../../core/hooks/use-success-transition";

export function SignOut() {
  const signingOut = useRef(false);

  const { authClient, basePath, viewPaths } = useAuth();
  const { onSuccess } = useOnSuccessTransition({
    redirectTo: `${basePath}/${viewPaths.SIGN_IN}`,
  });

  useEffect(() => {
    if (signingOut.current) return;
    signingOut.current = true;

    authClient.signOut().finally(onSuccess);
  }, [authClient, onSuccess]);

  return <Loader2 className="animate-spin" />;
}
