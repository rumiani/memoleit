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
  ];
  return (
    <section>
      <nav>
        {" "}
        <SuperPageLayout links={links} />
      </nav>
      <div className="my-4">{children}</div>
    </section>
  );
}
