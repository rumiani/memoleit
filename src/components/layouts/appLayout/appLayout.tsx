"use client";

import React, { useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { TbTransferVertical } from "react-icons/tb";

import SuperPage from "./superPage/superPage";
import { useAppDispatch } from "@/src/app/hooks";
import { db } from "@/src/services/db";
import { storedSettingReducer } from "@/src/redux/slices/settingStateSlice";

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
        url: "/dashboard/settings",
        title: "App Settings",
      },
      {
        url: "/dashboard/new",
        title: "New Item",
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
  {
    name: "transfer",
    icon: <TbTransferVertical />,
    links: [
      {
        url: "/transfer/export",
        title: "export",
      },
      {
        url: "/transfer/import",
        title: "import",
      },
    ],
  },
];

export default function ItemsNav() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    db.setting
      .where("name")
      .equals("setting")
      .first()
      .then((storedSetting) => {
        if (storedSetting) dispatch(storedSettingReducer(storedSetting!));
      })
      .catch(() => {
        console.log("Error");
      });
  }, [dispatch]);
  return (
    <div className="group fixed sm:top-20 bottom-0 left-0 flex flex-row sm:flex-col h-20 sm:h-full w-full sm:w-16 sm:hover:w-48 z-50 text-gray-800 bg-gray-100 sm:pt-4 sm:overflow-y-auto">
      {superPages.map((superPage, i) => {
        return <SuperPage key={i} superPage={superPage} />;
      })}
      <div></div>
    </div>
  );
}
