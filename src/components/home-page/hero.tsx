import Link from "next/link";
import React from "react";
import heroImage from "@/public/assets/images/leitner.webp";
import ImgHoverZoom from "../general/imgHoverZoom/imgHoverZoom";
export default function Hero() {
  return (
    <div className="w-full flex flex-col gap-4 md:flex-row justify-center items-center text-gray-800">
      <div className="w-full lg:w-1/2 md:w-4/5 mx-auto">
        <h1 className="text-gray-800 text-2xl lg:text-5xl xl:text-5xl font-bold lg:tracking-tight">
          Master Knowledge, One Card at a Time!
        </h1>
        <p className="text-lg text-justify mt-4 text-slate-600 max-w-xl">
          Memoleit is an innovative learning platform that helps you master new
          topics using the proven Leitner method. Harness the power of spaced
          repetition to improve memory retention and recall while making your
          study sessions more efficient and engaging. Join our community and
          accelerate your learning journey today!
        </p>
        <div className="mt-6 flex flex-row justify-center sm:justify-start gap-3">
          <Link
            href="/dashboard/review"
            rel="noopener"
            className="primaryBtn text-center animate-pulse"
          >
            Get Started
          </Link>
          <Link rel="noopener" href="/contact" className="secondaryBtn  text-center ">
            Contact Us
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <ImgHoverZoom src={heroImage} alt="Leitner box explained" />
      </div>
    </div>
  );
}
