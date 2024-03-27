"use client";
import { useEffect } from "react";
import { initialDataStoreToLocal } from "../handlers/initialDataStoreToLocal";
import HomeComps from "./components/home-page-components/homeComps";

export default function Home() {
useEffect(() =>{
  initialDataStoreToLocal()
},[])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1>home</h1>
        <HomeComps/>
      </div>
    </main>
  );
}
