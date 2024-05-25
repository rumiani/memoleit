"use client";
import SuperPageLayout from "@/src/components/layouts/superPageLayout/superPageLayout";
export default function TransferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = [
    {
      url: "/options/settings",
      title: "Settings",
    },
    {
      url: "/options/export",
      title: "Export",
    },
    {
      url: "/options/import",
      title: "Import",
    },
  ];
  return (
    <section>
      <nav>
        {" "}
        <SuperPageLayout links={links} />
      </nav>
      <div className="my-16 h-screen">{children}</div>
    </section>
  );
}
