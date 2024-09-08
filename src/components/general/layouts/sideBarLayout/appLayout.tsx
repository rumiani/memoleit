"use client";

import React from "react";
import { superPages } from "@/src/data/superPages/superPages";
import SuperPage from "./superPage/superPage";

export default function AppLayoutComp() {

  return (
    <div className="group z-50 bg-gray-100 fixed sm:top-16 bottom-0 left-0 sm:pt-4 sm:mb-4 sm:border-b sm:border-gray-300 sm:h-full w-full sm:w-fit">
      <div className="flex flex-row sm:flex-col justify-around sm:justify-start w-full sm:w-14 sm:hover:w-48 h-14 sm:h-full">
        {superPages.map((superPage, i) => {
          return <SuperPage key={i} superPage={superPage} />;
        })}
      </div>
    </div>
  );
}
