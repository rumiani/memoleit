"use client";
import ItemsNav from "@/src/components/general/layouts/appLayout/appLayout";
import { appDataInitialiser } from "@/src/handlers/appDataInitialiser";
import { useEffect } from "react";
export default function AppLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    appDataInitialiser();
  }, []);

  return (
    <div className="relative px-2 sm:px-6 lg:px-8">
      <ItemsNav />
      <div className="sm:ml-14">{children}</div>
    </div>
  );
}
