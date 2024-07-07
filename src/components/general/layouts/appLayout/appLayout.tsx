"use client";
import React, { ReactNode, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { GrDocumentConfig } from "react-icons/gr";
import SuperPage from "./superPage/superPage";
import { useAppDispatch } from "@/src/app/hooks";
import { db } from "@/src/services/db";
import { storedSettingReducer } from "@/src/redux/slices/settingStateSlice";
import { appDataInitialiser } from "@/src/handlers/appDataInitialiser";

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
        url: "/user/dashboard/review",
        title: "Review",
      },
      {
        url: "/user/dashboard/docs",
        title: "Docs",
      },
      {
        url: "/user/dashboard/new",
        title: "New Item",
      },
    ],
  },
  box: {
    name: "Box",
    icon: <FaBoxOpen />,
    links: [
      {
        url: "/user/box/box-data",
        title: "Box Data",
      },
      {
        url: "/user/box/categories",
        title: "Categories",
      },
      {
        url: "/user/box/search",
        title: "Search Items",
      },
    ],
  },
  options: {
    name: "Options",
    icon: <GrDocumentConfig />,
    links: [
      {
        url: "/user/options/settings",
        title: "Settings",
      },
      {
        url: "/user/options/export",
        title: "Export",
      },
      {
        url: "/user/options/import",
        title: "Import",
      },
    ],
  },
};

export default function ItemsNav() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    appDataInitialiser();
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
    <nav className="group fixed sm:absolute left-0 bottom-0 sm:bottom-0 flex flex-row sm:flex-col h-20 sm:h-full w-full sm:w-16 sm:hover:w-48 z-50 text-gray-800 bg-gray-100 sm:pt-4 sm:overflow-y-auto">
      {Object.values(superPages).map((superPage, i) => {
        return <SuperPage key={i} superPage={superPage} />;
      })}
      <div></div>
    </nav>
  );
}
