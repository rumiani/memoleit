"use client";
import ItemsNav from "@/src/components/layouts/appLayout/appLayout";
import { appDataInitialiser } from "@/src/handlers/newHandlers/appDataInitialiser";
export default function AppLayout({ children }: { children: React.ReactNode }) {
  appDataInitialiser()

  return (
    <section>
      <nav>
        {" "}
        <ItemsNav />
      </nav>
      <div className="sm:ml-14">{children}</div>
    </section>
  );
}
