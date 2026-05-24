"use client";
import { useEffect } from "react";
import { useProgressStore } from "@/lib/store/progress";

export function DBSyncProvider({ children }: { children: React.ReactNode }) {
  const { loadFromDB, dbLoaded } = useProgressStore();

  useEffect(() => {
    if (!dbLoaded) {
      loadFromDB();
    }
  }, []);

  return <>{children}</>;
}
