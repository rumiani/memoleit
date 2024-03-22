"use client";
import { useEffect } from "react";
import ItemsNav from "./components/home/navItems/NavItems";
import Review from "./components/home/review/review";
import { initialDataStoreToLocal } from "../handlers/initialDataStoreToLocal";

export default function Home() {
useEffect(() =>{
  initialDataStoreToLocal()
},[])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <ItemsNav/>
        <Review/>
      </div>
    </main>
  );
}
