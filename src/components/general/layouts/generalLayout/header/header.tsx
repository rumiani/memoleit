"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import LoginBtn from "./loginBtn/loginBtn";
let navLinks = [
  { name: "Dashboard", href: "/user/dashboard/review" },
  { name: "Home", href: "/" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = usePathname();
  const targetRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

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
          {isOpen ? <IoMdClose /> : <RxHamburgerMenu />}
        </button>
      </div>
      <div
        className={`bg-gray-900 sm:bg-transparent flex flex-col w-full p-4 sm:p-0 mt-2 rounded-lg sm:flex-row flex-grow justify-between items-center ${
          isOpen ? "block" : "hidden"
        } sm:flex sm:justify-end text-center`}
      >
        <ul className="sm:flex sm:justify-end gap-4  w-full mx-auto max-w-96 justify-around">
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
        <LoginBtn/>
      </div>
    </nav>
  );
};

export default Navbar;
