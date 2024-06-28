"use client";
import ItemsNav from "@/src/components/general/layouts/appLayout/appLayout";
import { appDataInitialiser } from "@/src/handlers/appDataInitialiser";
import { useEffect } from "react";
export default function AppLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    appDataInitialiser();
  }, []);

  return (
    <section className="relative">
      <nav>
        {" "}
        <ItemsNav />
      </nav>
      <div className="sm:ml-14">{children}</div>
    </section>
  );
}
