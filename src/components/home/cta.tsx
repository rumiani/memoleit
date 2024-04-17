import Link from "next/link";
import React from "react";

export default function Cta() {
  return (
    <div className="bg-black sm:px-20 py-20 my-20 mx-auto max-w-5xl rounded-lg flex flex-col items-center text-center">
      <h2 className="text-white text-3xl md:text-5xl">Track your leaning</h2>
      <p className="text-slate-500 mt-4 text-lg md:text-xl">
        With our progress charts you can track your learning and see your progress
      </p>
      <div className="flex mt-5">
        <Link href="/login" className="btn_secondary">
          Get Started
        </Link>
      </div>
    </div>
  );
}
