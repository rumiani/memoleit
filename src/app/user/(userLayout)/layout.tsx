"use client";
import ItemsNav from "@/src/components/general/layouts/appLayout/appLayout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session) return router.push("/login");

  return (
    <div className=" px-2 sm:px-6 lg:px-8">
      <ItemsNav />
      <div className="sm:ml-14">{children}</div>
    </div>
  );
}
