"use client";

import React from "react";
import { FaChartBar } from "react-icons/fa";
import { MdNoteAdd } from "react-icons/md";
import { RiFoldersFill } from "react-icons/ri";
import Link from "next/link";
import { MdFilterListAlt } from "react-icons/md";
export default function ItemsNav() {
  return (
    <div className="flex w-full pb-4 border-b border-gray-300">
      <Link href={"/progress"} title="Check out your progress" className="icon">
        <FaChartBar className="text-blue-700 text-xl" />
      </Link>
      <Link
        href={"/catagories"}
        title="See all the catagories"
        className="icon"
      >
        <RiFoldersFill className="text-gray-500 text-2xl" />
      </Link>
      <span className="icon text-3xl" title="Filter catagories">
        <MdFilterListAlt />
      </span>

      <Link href={"/new"} className="icon">
        <MdNoteAdd title="Add a new item" className="text-green-700 icon" />
      </Link>
    </div>
  );
}
