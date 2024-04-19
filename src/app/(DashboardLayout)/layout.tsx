"use client";
import ItemsNav from "@/src/components/dashboardLayout/dashboardLayout";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <section>
      <nav>
        {" "}
        <ItemsNav />
      </nav>
      {children}
    </section>
  );
}
