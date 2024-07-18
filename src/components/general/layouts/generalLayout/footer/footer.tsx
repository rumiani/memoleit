"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isUserRoute } from "@/src/handlers/general/isPage";
import InstallPWA from "./installBtn/installBtn";

const Footer = () => {
  const path = usePathname();
  return (
    <>
      {!isUserRoute(path) && (
        <footer className="w-full bg-gray-800 text-white p-2">
          <div className="flex flex-col gap-1">
            <div className="w-full max-w-96 mx-auto flex flex-row justify-around items-center gap-2 text-center">
              <Link href="/faq" className="">
                FAQ
              </Link>
              <Link href="/contact" className="">
                Contact Us
              </Link>
              <Link href="/about" className="">
                About Us
              </Link>
              <InstallPWA />
            </div>
            <p className="text-sm text-center">
              &copy; {new Date().getFullYear()} MemoLeit. All rights reserved.
            </p>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
