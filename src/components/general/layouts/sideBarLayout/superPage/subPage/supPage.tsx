import { LinksTypes } from "@/src/types/interface";
import { capitalize } from "lodash";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SubPage({ links }: { links: LinksTypes[] }) {
  const path = usePathname()
  
  return (
    <div className="hidden group-hover:flex flex-col ml-6">
      {links.map((link, i) => {
        return (
          <Link
            key={i}
            href={link.url}
            title={link.lable}
            className={`${path.split("/")[3] === link.name && "font-bold"} w-full p-2 text-lg hover:bg-gray-200 items-center`}
          >
            {link.lable}
          </Link>
        );
      })}
    </div>
  );
}