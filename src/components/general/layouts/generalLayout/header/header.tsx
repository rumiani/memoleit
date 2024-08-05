"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import LoginBtn from "./profile/profile";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = usePathname();
  const targetRef = useRef<HTMLDivElement>(null);

  return (
    <nav
      ref={targetRef}
      className="absolute z-50 w-full h-16 top-0 bg-gray-800 px-4 py-2 flex flex-col sm:flex-row justify-between"
    >
      <div className="flex items-center justify-between w-full h-full">
        <Link href={"/"}>
          <p className="text-white align-middle text-xl font-bold">
            Memoleit
          </p>
        </Link>
        <LoginBtn />
      </div>
    </nav>
  );
};

export default Navbar;
