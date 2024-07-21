import { redirect, usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function NotFoundComp() {
  const path = usePathname();
  useEffect(() => {
    if (path === "/user/dashboard" || path === "/user")
      redirect("/user/dashboard/review");
    if (path === "/user/box") redirect("/user/box/box-data");
    if (path === "/user/options") redirect("/user/options/settings");
  }, [path]);
  return (
    <div className="h-screen">

    <div className="flex flex-col items-center justify-center mx-auto rounded-lg p-4 my-4 max-w-96 h-72 border border-gray-300">
      <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        Oops! <br />
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
    </div>
    </div>
  );
}
