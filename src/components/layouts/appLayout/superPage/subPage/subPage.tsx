import { capitalize } from "lodash";
import Link from "next/link";
import React from "react";
interface LinksType {
  url: string;
  title: string;
}
export default function PageLinks({ links }: { links: LinksType[] }) {

  return (
    <div className="hidden group-hover:flex flex-col ml-6">
      {links.map((link, i) => {
        return (
          <Link
            key={i}
            href={link.url}
            title={link.title}
            className="w-full px-4 text-lg hover:bg-gray-200 items-center"
          >
            {capitalize(link.title)}
          </Link>
        );
      })}
    </div>
  );
}
