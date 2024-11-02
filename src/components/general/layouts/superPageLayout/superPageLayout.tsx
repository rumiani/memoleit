import { LinksTypes } from "@/src/types/interface";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SuperPageLayout({
  links,
}: {
  links: LinksTypes[];
}) {
  const pathname = usePathname();

  return (
    <div className="mb-4 flex flex-row gap-4 w-full max-w-96">
      {links.map((link: LinksTypes, i: number) => (
        <Link
          href={link.url}
          key={i}
          className="text-blue-500 hover:text-blue-700 "
        >
          <span
            className={`${pathname === link.url && "border-b-2 border-blue-500 font-bold"} w-1/3  p-1 px-2`}
          >
            {link.lable}
          </span>
        </Link>
      ))}
    </div>
  );
}
