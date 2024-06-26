"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

let navLinks = [
  { name: "Dashboard", href: "/dashboard/review" },
  { name: "Login", href: "/api/auth/signin" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = usePathname();
  const targetRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        targetRef.current &&
        !targetRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
      // if (session) {
      //   navLinks.push({ name: "Dashboard", href: "/dashboard" });
      //   console.log("signed In");
      // } else {
      //   navLinks = navLinks.filter((link) => link.href !== "/dashboard");
      //   console.log("signed Out");
      // }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [session]);

  return (
    <nav
      ref={targetRef}
      className="absolute z-50 w-full  h-20 top-0 bg-gray-800 px-4 py-2 flex flex-col sm:flex-row justify-between"
    >
      <div className="flex items-center justify-between w-full sm:w-auto">
        <Link href={"/"}>
          <span className="text-white align-middle text-xl pt-3 font-bold">
            Memoleit
          </span>
        </Link>
        <button
          className="block sm:hidden text-white font text-3xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "X" : "☰"}
        </button>
      </div>
      <div
        className={`bg-gray-900 sm:bg-transparent flex flex-col-reverse w-full p-4 sm:p-0 mt-2 rounded-lg sm:flex-row flex-grow justify-between items-center ${
          isOpen ? "block" : "hidden"
        } sm:flex text-center `}
      >
        <ul className="sm:flex  w-full mx-auto max-w-96 justify-around">
          {navLinks.map((link) => {
            const isActive = router.endsWith(link.href);
            return (
              <li
                key={link.name}
                onClick={() => setIsOpen(false)}
                className="mt-4 sm:mt-0"
              >
                <Link
                  href={link.href}
                  className={`${
                    isActive ? "text-gray-400" : "text-white"
                  } hover:text-gray-400 `}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
        {/* {!router.endsWith("login") && (
            <Link href="/login" className="btn_secondary text-blue-400">
              Login
            </Link>
          )} */}
      </div>
    </nav>
  );
};

export default Navbar;
