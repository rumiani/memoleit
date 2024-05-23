"use client";
import SuperPageLayout from "@/src/components/layouts/superPageLayout/superPageLayout";
export default function Layout({ children }: { children: React.ReactNode }) {
    const links = [
        {
          url: "/box/box-data",
          title: "Box Data",
        },
        {
          url: "/box/categories",
          title: "Categories",
        },
        {
          url: "/box/search",
          title: "Search Items",
        },
      ]
  return (
    <section>
      <nav>
        {" "}
        <SuperPageLayout links={links}/>
      </nav>
      <div className="my-8 min-h-screen">{children}</div>
    </section>
  );
}
