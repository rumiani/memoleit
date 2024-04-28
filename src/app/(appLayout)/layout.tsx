"use client";
import ItemsNav from "@/src/components/layouts/appLayout/appLayout";
export default function AppLayout({ children }: { children: React.ReactNode }) {
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
