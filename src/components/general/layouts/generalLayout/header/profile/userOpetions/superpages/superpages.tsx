import { superPages } from "@/src/data/superPages/superPages";
import { settingsPageUrl } from "@/src/handlers/general/pagesLinks";
import Link from "next/link";
import { IoMdSettings } from "react-icons/io";

export default function Superpages() {
  console.log(superPages);
  return (
    <div className="flex flex-col text-lg">
      {superPages.map((superPage, i) => {
        const SuperPage = superPage.icon;
        return (
          <Link key={i} href={superPage.links[0].url}>
            <div className="flex flex-row gap-2 hover:bg-gray-200 p-2 ">
              <SuperPage className="text-2xl" />
              <span>{superPage.lable}</span>
            </div>
          </Link>
        );
      })}
      <Link href={settingsPageUrl}>
        <div className="flex flex-row items-center text-gray-800 border-b border-gray-200 hover:bg-gray-100 group p-2 ">
          <IoMdSettings className="text-2xl" />
          <span className="w-full ml-2">Settings</span>
        </div>
      </Link>
    </div>
  );
}
