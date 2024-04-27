"use client";

import React from "react";
import { MdDashboard } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import SuperPage from "./superPage/superPage";

interface SuperPageTypes {}

const superPages: any[] = [
  {
    name: "dashboard",
    icon: <MdDashboard />,
    links: [
      {
        url: "/dashboard/review",
        title: "Review",
      },
      {
        url: "/dashboard/new",
        title: "New Item",
      },
      {
        url: "/dashboard/transfer",
        title: "Transfer Data",
      },
    ],
  },
  {
    name: "box",
    icon: <FaBoxOpen />,
    links: [
      {
        url: "/box/box-data",
        title: "Box Data",
      },
      {
        url: "/box/categories",
        title: "Categories",
      },
      {
        url: "/box/search",
        title: "Search Items",
      },
    ],
  },
];

export default function ItemsNav() {
  return (
    <div className="group text-gray-800 bg-gray-100 fixed top-20 z-50 left-0 h-full w-14  hover:w-48 pt-4 mb-4 border-b border-gray-300 text-3xl gap-2">
      {superPages.map((superPage, i) => {
        return <SuperPage key={i} superPage={superPage} />;
      })}
    </div>
  );
}
