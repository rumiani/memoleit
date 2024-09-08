import { settingsPageUrl } from "@/src/handlers/general/pagesLinks";
import Link from "next/link";
import { IoMdSettings } from "react-icons/io";

export default function Superpages() {
  return (
    <div>
      <Link href={settingsPageUrl}>
        <div className="flex flex-row items-center text-gray-800 border-b border-gray-200 text-2xl p-2 hover:bg-gray-100 group">
          <span className="group-hover:animate-grayBlackBlink duration-[2s]">
            <IoMdSettings />
          </span>
          <span className="text-xl w-full ml-2">Settings</span>
        </div>
      </Link>
    </div>
  );
}
