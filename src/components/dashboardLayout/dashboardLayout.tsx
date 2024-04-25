"use client";

import React from "react";
import { FaChartBar } from "react-icons/fa";
import { MdNoteAdd } from "react-icons/md";
import { RiFoldersFill } from "react-icons/ri";
import Link from "next/link";
import { FaReadme } from "react-icons/fa";
import { IoSearchCircle } from "react-icons/io5";
import { TbTransferVertical } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { capitalize } from "lodash";
const itemsNav = [
  {
    url: "/dashboard",
    title: "Go to the dashboard",
    icon: <FaReadme className="text-orange-700" />,
  },
  {
    url: "/progress",
    title: "Check out your progress",
    icon: <FaChartBar className="text-blue-700" />,
  },
  {
    url: "/categories",
    title: "See all the categories",
    icon: <RiFoldersFill className=" text-gray-700" />,
  },
  {
    url: "/search",
    title: "Search an item",
    icon: <IoSearchCircle className="text-gray-700" />,
  },
  {
    url: "/transfer",
    title: "Transfer your data",
    icon: <TbTransferVertical className="text-gray-700" />,
  },
  {
    url: "/new",
    title: "Add a new item",
    icon: <MdNoteAdd className="text-green-700" />,
  },
];

export default function ItemsNav() {
  const pathname = usePathname();
  return (
    <div className="flex w-full pb-2 mb-4 border-b border-gray-300 text-3xl gap-2">
      {itemsNav.map((item, i) => {
        return (
          <div key={i} className="flex flex-wrap">
            <Link
              href={item.url}
              title={item.title}
              className={`${
                pathname.startsWith(item.url) && "bg-gray-400"
              } icon !p-2 !w-fit`}
            >
              {item.icon}
              <span className="hidden lg:block text-xl mx-2 pt-2">
                {capitalize(item.url.substring(1))}
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
