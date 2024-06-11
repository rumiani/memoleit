"use client";
import SuperPageLayout from "@/src/components/layouts/superPageLayout/superPageLayout";
export default function Layout({ children }: { children: React.ReactNode }) {
  const links = [
    {
      url: "/study/read",
      title: "Reading",
    },
    {
      url: "/study/books",
      title: "Books",
    },
    {
      url: "/study/new",
      title: "New Pdf",
    },
  ];
  return (
    <section>
      <nav>
        {" "}
        <SuperPageLayout links={links} />
      </nav>
      {children}
    </section>
  );
}
