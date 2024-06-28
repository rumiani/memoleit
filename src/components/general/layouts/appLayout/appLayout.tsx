"use client";
import React, { ReactNode, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { GrDocumentConfig } from "react-icons/gr";
import SuperPage from "./superPage/superPage";
import { useAppDispatch } from "@/src/app/hooks";
import { db } from "@/src/services/db";
import { storedSettingReducer } from "@/src/redux/slices/settingStateSlice";
import { generateToken } from "@/src/notifications/firebase";

interface Link {
  url: string;
  title: string;
}

interface Page {
  name: string;
  icon: ReactNode;
  links: Link[];
}

interface SuperPageTypes {
  [key: string]: Page;
}

export const superPages: SuperPageTypes = {
  dashboard: {
    name: "Dashboard",
    icon: <MdDashboard />,
    links: [
      {
        url: "/dashboard/review",
        title: "Review",
      },
      {
        url: "/dashboard/docs",
        title: "Docs",
      },
      {
        url: "/dashboard/new",
        title: "New Item",
      },
    ],
  },
  box: {
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
  options: {
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
};

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

      // generateToken()
  }, [dispatch]);
  return (
    <div className="group fixed left-0 bottom-0 sm:top-20 flex flex-row sm:flex-col h-20 sm:h-full w-full sm:w-16 sm:hover:w-48 z-50 text-gray-800 bg-gray-100 sm:pt-4 sm:overflow-y-auto">
      {Object.values(superPages).map((superPage, i) => {
        return <SuperPage key={i} superPage={superPage} />;
      })}
      <div></div>
    </div>
  );
}
