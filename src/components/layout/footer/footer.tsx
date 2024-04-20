import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <div className="text-center">
          <Link href='/faq' className="gen_link m-4">FAQ</Link>
          <Link href='/contact' className="gen_link m-4">Contact Us</Link>
          <Link href='/about' className="gen_link m-4">About Us</Link>
          <p className="mt-4 text-sm">
            &copy; {new Date().getFullYear()} MemoLight. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer