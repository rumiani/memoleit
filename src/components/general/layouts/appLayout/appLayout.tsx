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
import {
  boxDataPageUrl,
  categoriesPageUrl,
  docsPageUrl,
  exportPageUrl,
  importPageUrl,
  newPageUrl,
  reviewPageUrl,
  searchPageUrl,
  settingsPageUrl,
} from "@/src/handlers/general/pagesLinks";

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
        url: reviewPageUrl,
        title: "Review",
      },
      {
        url: docsPageUrl,
        title: "Docs",
      },
      {
        url: newPageUrl,
        title: "New Item",
      },
    ],
  },
  box: {
    name: "Box",
    icon: <FaBoxOpen />,
    links: [
      {
        url: boxDataPageUrl,
        title: "Box Data",
      },
      {
        url: categoriesPageUrl,
        title: "Categories",
      },
      {
        url: searchPageUrl,
        title: "Search Items",
      },
    ],
  },
  options: {
    name: "Options",
    icon: <GrDocumentConfig />,
    links: [
      {
        url: settingsPageUrl,
        title: "Settings",
      },
      {
        url: exportPageUrl,
        title: "Export",
      },
      {
        url: importPageUrl,
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
  }, [dispatch]);
  return (
    <nav className="group fixed z-40 sm:absolute left-0 bottom-0 sm:top-0 flex flex-row sm:flex-col h-20 sm:h-screen sm:pt-24 w-full sm:w-16 sm:hover:w-48 text-gray-800 bg-gray-100 sm:overflow-y-auto">
      {Object.values(superPages).map((superPage, i) => (
        <SuperPage key={i} superPage={superPage} />
      ))}
      <div></div>
    </nav>
  );
}
