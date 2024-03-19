"use client";
import Link from "next/link";
import React, { useState } from "react";
import ImgHoverZoom from "@/src/app/components/imgHoverZoom/imgHoverZoom";
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur error soluta sed excepturi odit consectetur hic ab ipsa
              mollitia! Laudantium dolorum officia quis officiis provident
              commodi accusantium consequatur quidem maiores. 
              <span className={`${seeMore ? "inline" : "hidden"}`}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum corrupti delectus, sapiente quam placeat debitis eum cumque atque sequi a rem vitae blanditiis modi ducimus aliquid officia fugiat provident ipsam!
                {" "}
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
