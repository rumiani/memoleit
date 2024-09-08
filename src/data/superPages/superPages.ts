import { SuperPageTypes } from "@/src/types/interface";
import { MdDashboard } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";

export const superPages: SuperPageTypes[] = [
  {
    lable: "Dashboard",
    name: "dashboard",
    icon: MdDashboard,
    links: [
      {
        lable: "Review",
        name: "review",
        url: "/user/dashboard/review",
      },
      {
        lable: "Docs",
        name: "docs",
        url: "/user/dashboard/docs",
      },
      {
        lable: "New Item",
        name: "new",
        url: "/user/dashboard/new",
      },
    ],
  },
  {
    lable: "Box",
    name: "box",
    icon: FaBoxOpen,
    links: [
      {
        lable: "Box Data",
        name: "box-data",
        url: "/user/box/box-data",
      },
      {
        lable: "Categories",
        name: "categories",
        url: "/user/box/categories",
      },
      {
        lable: "Search Items",
        name: "search",
        url: "/user/box/search",
      },
    ],
  },
];
