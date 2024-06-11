"use client";
import { superPages } from "@/src/components/layouts/appLayout/appLayout";
import SuperPageLayout from "@/src/components/layouts/superPageLayout/superPageLayout";
export default function TransferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <nav>
        {" "}
        <SuperPageLayout links={superPages.options.links} />
      </nav>
      <div className="my-16 h-screen">{children}</div>
    </section>
  );
}
