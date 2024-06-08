import Link from "next/link";
import React from "react";

export default function NotFoundComp() {
  return (
    <div className="flex flex-col items-center justify-center mx-auto rounded-lg p-4 my-4 max-w-96 h-72 border border-gray-300">
      <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        Oops! <br />
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <div className="w-full flex flex-row gap-2">
        <Link href="/" className="primaryBtn w-fit">
          Home
        </Link>
        <Link href="/dashboard/review" className="primaryBtn w-fit">
          Dashboard
        </Link>
      </div>
    </div>
  );
}
