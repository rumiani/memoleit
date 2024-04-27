"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import PageLinks from "./subPage/subPage";

export default function SuperPage({ superPage }: { superPage: any }) {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <div
      className={`${
        pathname.startsWith("box") && "bg-gray-400"
      } flex flex-col w-full p-2 z-50 left-0 pb-2 mb-4 border-b border-gray-300 text-3xl`}
    >
      <div
        onClick={() => setShowMenu(!showMenu)}
        className="flex flex-row cursor-pointer justify-between gap-2"
      >
        <span>{superPage.icon}</span>
        <span className="group-hover:block hidden text-xl font-bold">
          {superPage.name}
        </span>
        <FaChevronDown
          className={`${
            showMenu ? "rotate-180" : ""
          } transition-all duration-300 hidden group-hover:block mt-2 text-lg text-gray-800`}
        />
      </div>
      {showMenu && <PageLinks links={superPage.links} />}
    </div>
  );
}
