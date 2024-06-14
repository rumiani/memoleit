"use client";
import Link from "next/link";
import React, { useState } from "react";
import ImgHoverZoom from "@/src/components/general/imgHoverZoom/imgHoverZoom";
import aboutImage from "@/public/assets/images/about/about.jpeg";
export default function About() {
  const [seeMore, setSeeMore] = useState(false);
  return (
    <>
      <div className="flex flex-col lg:flex-row text-gray-800">
        <div className="my-8 w-full lg:w-1/2 md:w-4/5 mx-auto">
          <h1 className="text-gray-800 lg:text-5xl xl:text-5xl lg:tracking-tight text-3xl font-bold mb-4">
            About Us
          </h1>
          <div className="flex flex-row">
            <p className="text-lg md:text-xl mt-4 text-slate-600 max-w-2xl">
              Welcome to MemoLeit, the ultimate app designed to help you
              master any subject using the proven Leitner system. At
              MemoLeit, we believe that effective learning should be both fun
              and efficient. Our app offers a personalized learning experience
              with interactive charts that track your progress and ensure you
              focus on the material that needs the most attention. 
              <span className={`${seeMore ? "inline" : "hidden"}`}>
              Receive
              timely notifications to keep you on track and never miss a study
              session. Our intuitive interface allows you to add pictures to
              your flashcards, enhancing your ability to remember complex
              information. Whether you&apos;re studying for exams, learning a new
              language, or just looking to expand your knowledge, MemoLeit is
              your go-to tool for making memorization easier and more enjoyable.
              Join us today and start your journey to becoming a memory master!{" "}
              </span>
              <button
                onClick={() => setSeeMore(!seeMore)}
                className={` text-blue-600 cursor-pointer`}
              >
                {seeMore ? "show less" : "... see more"}
              </button>
            </p>
          </div>
          <div className="mt-6 mx-auto flex justify-center">
            <Link href="/contact" className="btn_primary mx-auto">
              <button className="primaryBtn">Contact Us</button>
            </Link>
          </div>
        </div>
        <div className="w-full max-w-96 lg:w-1/3 my-8 mx-auto">
          <ImgHoverZoom src={aboutImage} alt="Astronaut in the air" />
        </div>
      </div>
    </>
  );
}
