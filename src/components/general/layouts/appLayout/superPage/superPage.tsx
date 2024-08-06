"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import PageLinks from "./subPage/subPage";
import { capitalize } from "lodash";
import Link from "next/link";

export default function SuperPage({ superPage }: { superPage: any }) {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-around items-center sm:hidden w-full text-gray-800 bg-gray-100 border-b border-gray-300 text-3xl gap-2">
        <Link href={superPage.links[0].url}>
          <div className="flex flex-col items-center w-fit justify-center text-center">
            <span className="text-center">{superPage.icon}</span>
            <span className="text-xl text-center w-full">
              {capitalize(superPage.name)}
            </span>
          </div>
        </Link>
      </div>
      <div className="hidden sm:flex flex-col gap-2 p-2 mb-2 text-gray-800 border-b border-gray-300 text-3xl">
        <div
          onClick={() => setShowMenu(!showMenu)}
          className="flex flex-row cursor-pointer justify-between gap-2"
        >
          <span>{superPage.icon}</span>
          <div className="w-full flex justify-between">
            <span className="group-hover:block hidden text-xl font-bold">
              {capitalize(superPage.name)}
            </span>
            <FaChevronDown
              className={`${
                showMenu ? "rotate-180" : ""
              } transition-all duration-300 hidden group-hover:block mt-2 text-lg text-gray-800`}
            />
          </div>
        </div>
        {showMenu && <PageLinks links={superPage.links} />}
      </div>
    </>
  );
}
