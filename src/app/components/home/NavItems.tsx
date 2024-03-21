"use client";

import React from "react";
import { FaChartBar } from "react-icons/fa";
import { MdNoteAdd } from "react-icons/md";
import Link from "next/link";
import Filters from "./filters/filters";

export default function ItemsNav() {
  return (
    <div className="flex w-full pb-4 border-b border-gray-300">
      <Link href={"/progress"} title="Check out your progress">
        <FaChartBar className="text-blue-700 icon" />
      </Link>

      <span className="icon" title="Filter catagories">
      <Filters/>
      </span>

      <Link href={"/new"} >
        <MdNoteAdd title="Add a new item" className="text-green-700 icon" />
      </Link>
    </div>
  );
}
