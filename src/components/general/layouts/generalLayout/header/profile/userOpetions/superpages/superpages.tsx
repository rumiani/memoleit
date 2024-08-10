import { useAppDispatch } from "@/src/app/hooks";
import { appDataInitialiser } from "@/src/handlers/appDataInitialiser";
import {
  boxDataPageUrl,
  categoriesPageUrl,
  docsPageUrl,
  loginPageUrl,
  newPageUrl,
  reviewPageUrl,
  searchPageUrl,
  settingsPageUrl,
} from "@/src/handlers/general/pagesLinks";
import { storedSettingReducer } from "@/src/redux/slices/settingStateSlice";
import { db } from "@/src/services/db";
import { capitalize } from "lodash";
import Link from "next/link";
import { ReactNode, useEffect } from "react";
import { FaBoxOpen } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdDashboard, MdOutlineLogout } from "react-icons/md";
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
  settings: {
    name: "Settings",
    icon: <IoMdSettings />,
    links: [
      {
        url: settingsPageUrl,
        title: "Settings",
      },
    ],
  }
};
export default function Superpages() {
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
    <div>
      {Object.values(superPages).map((superPage, i) => {
        return (
          <Link key={i} href={superPage.links[0].url} >
            <div className="flex flex-row items-center text-gray-800 border-b border-gray-200 text-2xl p-2 hover:bg-gray-100 group">
              <span className="group-hover:animate-grayBlackBlink duration-[2s]">{superPage.icon}</span>
              <span className="text-xl w-full ml-2">
                {capitalize(superPage.name)}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
