"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {
    console.log("unsubscribe");
  };
}

export function useIsHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
