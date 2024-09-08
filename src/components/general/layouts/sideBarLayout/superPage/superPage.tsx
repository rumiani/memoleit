"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import SubPage from "./subPage/supPage";
import { capitalize } from "lodash";
import { SuperPageTypes } from "@/src/types/interface";
import Link from "next/link";

export default function SuperPage({
  superPage,
}: {
  superPage: SuperPageTypes;
}) {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const SupePageIcon = superPage.icon;
  return (
    <div className="flex flex-col sm:w-full p-2 z-50 left-0 pb-2 mb-4 sm:border-b border-gray-300 text-3xl sm:text-4xl text-gray-800">
      <div
        onClick={() => setShowMenu(!showMenu)}
        className={`${pathname.split("/")[2] === superPage.name ? "text-gray-900" : "text-gray-500"}  flex flex-row cursor-pointer justify-between gap-2`}
      >
        <Link href={superPage.links[0].url}>
          <span title={superPage.name}>
            <SupePageIcon />
          </span>
        </Link>
        <span className="block sm:hidden sm:group-hover:block text-xl font-bold">
          {capitalize(superPage.name)}
        </span>
        <FaChevronDown
          className={`${
            showMenu ? "rotate-180" : ""
          } transition-all duration-300 hidden sm:group-hover:block mt-2 text-lg text-gray-800`}
        />
      </div>
      <div className="hidden sm:block">
        {showMenu && <SubPage links={superPage.links} />}
      </div>
    </div>
  );
}
