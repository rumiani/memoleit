import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SuperPageLayout({
  links,
}: {
  links: { url: string; title: string }[];
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-row gap-4 w-full max-w-96">
      {links.map((link: { url: string; title: string }, i: number) => (
        <Link
          href={link.url}
          key={i}
          className="text-blue-500 hover:text-blue-700 "
        >
          <span
            className={`${pathname === link.url && "border-b-4 border-blue-500 font-bold"} w-1/3  p-1 px-2`}
          >
            {link.title}
          </span>
        </Link>
      ))}
    </div>
  );
}
