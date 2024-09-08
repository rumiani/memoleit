"use client";

import SuperPageLayout from "@/src/components/general/layouts/superPageLayout/superPageLayout";
import { superPages } from "@/src/data/superPages/superPages";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <SuperPageLayout links={superPages[0].links} />
      {children}
    </section>
  );
}
