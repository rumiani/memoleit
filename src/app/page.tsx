"use client";
import Link from "next/link";
import MainPage from "../components/home/mainPage";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-10 max-w-6xl w-full items-center justify-between font-mono text-sm">
        <Link href={"/dashboard"} className="text-blue-500">
          Dashboard
        </Link>
        <MainPage/>
      </div>
    </div>
  );
}
