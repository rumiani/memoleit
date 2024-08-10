"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    // if (!session) return router.push("/login");
  });

  return (
      <div className="p-2">{children}</div>
  );
}
