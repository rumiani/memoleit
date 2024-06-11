"use client";
import { superPages } from "@/src/components/layouts/appLayout/appLayout";
import SuperPageLayout from "@/src/components/layouts/superPageLayout/superPageLayout";
export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <section>
      <nav>
        {" "}
        <SuperPageLayout links={superPages.dashboard.links} />
      </nav>
      {children}
    </section>
  );
}
