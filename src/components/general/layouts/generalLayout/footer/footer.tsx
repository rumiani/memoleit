"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isUserRoute } from "@/src/handlers/general/isPage";

const Footer = () => {
  const path = usePathname();
  return (
    <>
      {!isUserRoute(path) && (
        <footer className="w-full bg-gray-800 text-white p-2">
          <div className="mx-auto">
            <div className="text-center">
              <Link href="/faq" className="gen_link m-4">
                FAQ
              </Link>
              <Link href="/contact" className="gen_link m-4">
                Contact Us
              </Link>
              <Link href="/about" className="gen_link m-4">
                About Us
              </Link>
              <p className="mt-4 text-sm">
                &copy; {new Date().getFullYear()} MemoLeit. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
