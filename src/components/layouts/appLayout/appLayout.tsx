"use client";

import React, { ReactElement, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { GrDocumentConfig } from "react-icons/gr";import SuperPage from "./superPage/superPage";
import { useAppDispatch } from "@/src/app/hooks";
import { db } from "@/src/services/db";
import { storedSettingReducer } from "@/src/redux/slices/settingStateSlice";

interface SuperPageTypes {
  name: string;
  icon: ReactElement;
  links: { url: string; title: string }[];
}

const superPages: SuperPageTypes[] = [
  {
    name: "Dashboard",
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
    ],
  },
  {
    name: "Box",
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
    name: "Options",
    icon: <GrDocumentConfig />,
    links: [
      {
        url: "/options/settings",
        title: "Settings",
      },
      {
        url: "/options/export",
        title: "Export",
      },
      {
        url: "/options/import",
        title: "Import",
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
    <div className="group fixed left-0 bottom-0 sm:top-20 flex flex-row sm:flex-col h-20 sm:h-full w-full sm:w-16 sm:hover:w-48 z-50 text-gray-800 bg-gray-100 sm:pt-4 sm:overflow-y-auto">
      {superPages.map((superPage, i) => {
        return <SuperPage key={i} superPage={superPage} />;
      })}
      <div></div>
    </div>
  );
}
