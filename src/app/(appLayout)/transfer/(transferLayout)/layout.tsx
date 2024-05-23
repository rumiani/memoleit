"use client";
import SuperPageLayout from "@/src/components/layouts/superPageLayout/superPageLayout";
export default function TransferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = [
    {
      url: "/transfer/export",
      title: "export",
    },
    {
      url: "/transfer/import",
      title: "import",
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
