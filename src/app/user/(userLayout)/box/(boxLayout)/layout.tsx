"use client";
import { superPages } from "@/src/components/general/layouts/generalLayout/header/profile/userOpetions/superpages/superpages";
import SuperPageLayout from "@/src/components/general/layouts/superPageLayout/superPageLayout";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <SuperPageLayout links={superPages.box.links} />
      {children}
    </section>
  );
}
