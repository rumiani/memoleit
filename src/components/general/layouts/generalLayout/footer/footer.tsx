"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const path = usePathname();
  const notApplication: boolean =
    path === "/" || path === "/about" || path === "/faq" || path === "/contact";

  return (
    <>
      {notApplication && (
        <footer className="hidden sm:block w-full bg-gray-800 text-white p-4">
          <div className="container mx-auto">
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
                &copy; {new Date().getFullYear()} MemoLight. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
