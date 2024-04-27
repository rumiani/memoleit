"use client";
import ItemsNav from "@/src/components/appLayout/appLayout";
export default function BoxLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <nav>
        {" "}
        Box Layout
        {/* <ItemsNav /> */}
      </nav>
      <div className="ml-14">{children}</div>
    </section>
  );
}
