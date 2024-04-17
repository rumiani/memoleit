"use client";
import Link from "next/link";
import MainPage from "../components/home/mainPage";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <MainPage />
    </div>
  );
}
