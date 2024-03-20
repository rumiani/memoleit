"use client";

import React from "react";
import { FaChartBar } from "react-icons/fa";
import { MdNoteAdd } from "react-icons/md";
import { FaFilter } from "react-icons/fa6";
import Link from "next/link";
import Filters from "../filters/filters";

export default function ItemsNav() {
  return (
    <div className="flex w-full pb-4 border-b border-gray-300">
      <Link href={"/progress"}>
        <FaChartBar title="Progress" className="text-blue-700 icon" />
      </Link>

      <Filters />

      <Link href={"/new"}>
        <MdNoteAdd title="New item" className="text-green-700 icon" />
      </Link>
    </div>
  );
}
