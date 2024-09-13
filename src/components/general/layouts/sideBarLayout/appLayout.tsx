"use client";

import React from "react";
import { superPages } from "@/src/data/superPages/superPages";
import SuperPage from "./superPage/superPage";

export default function AppLayoutComp() {

  return (
    <div className="group z-50 relative bg-gray-900 h-full bottom-0 left-0 sm:mb-4 sm:border-b sm:border-gray-300 sm:h-full w-full sm:w-fit">
      <div className="fixed bg-gray-100 flex flex-row sm:flex-col justify-around sm:justify-start bottom-0 sm:top-16 w-full sm:w-14 sm:hover:w-48 h-14 sm:h-screen">
        {superPages.map((superPage, i) => {
          return <SuperPage key={i} superPage={superPage} />;
        })}
      </div>
    </div>
  );
}
