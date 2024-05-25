"use client";
import JoyrideComponent from "@/src/components/joyride/joyride";
import ItemsNav from "@/src/components/layouts/appLayout/appLayout";
import { appDataInitialiser } from "@/src/handlers/appDataInitialiser";
export default function AppLayout({ children }: { children: React.ReactNode }) {
  appDataInitialiser();

  return (
    <section className="relative">

      <nav className="w-full h-full bg-red-500">
        {" "}
        <ItemsNav />
      </nav>
      <div className="sm:ml-14">{children}</div>
    </section>
  );
}
