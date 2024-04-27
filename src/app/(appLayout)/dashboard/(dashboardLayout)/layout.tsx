"use client";
import SuperPageLayout from "@/src/components/layouts/superPageLayout/superPageLayout";
export default function Layout({ children }: { children: React.ReactNode }) {
  const links = [
    {
      url: "/dashboard/review",
      title: "Review",
    },
    {
      url: "/dashboard/new",
      title: "New Item",
    },
    {
      url: "/dashboard/transfer",
      title: "Transfer Data",
    },
  ];
  return (
    <section>
      <nav>
        {" "}
        <SuperPageLayout links={links} />
      </nav>
      <div className="ml-14 mt-4">{children}</div>
    </section>
  );
}
