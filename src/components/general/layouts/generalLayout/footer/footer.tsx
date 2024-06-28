"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="sm:fixed bottom-0 w-full bg-gray-800 text-white p-2">
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
            &copy; {new Date().getFullYear()} MemoLeit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
