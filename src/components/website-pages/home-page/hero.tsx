import Link from "next/link";

import { useState } from "react";
import Spinner from "../../general/loading-comps/spinner/spinner";
export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 justify-center  text-gray-800 py-4">
      <div className="w-full flex flex-col justify-between md:w-1/2 mx-auto">
        <div>
          <h1 className="text-gray-800 text-2xl lg:text-5xl xl:text-5xl font-bold">
            Master Knowledge, One Card at a Time!
          </h1>
          <p className="text-lg text-justify mt-4 text-slate-600 max-w-xl">
            Memoleit is an innovative learning platform that helps you master
            new topics using the proven Leitner method. Harness the power of
            spaced repetition to improve memory retention and recall while
            making your study sessions more efficient and engaging. Join our
            community and accelerate your learning journey today!
          </p>
        </div>
        <div className="mt-6 flex flex-row justify-center sm:justify-start gap-3">
          <Link
            href="/user/dashboard/review"
            rel="noopener"
            className="primaryBtn text-center "
          >
            <span className="text-lg font-bold">G</span>
            <span>et</span>
            &nbsp;
            <span className="text-lg font-bold">S</span>
            <span>tarted</span>
          </Link>
          <Link
            rel="noopener"
            href="/contact"
            className="secondaryBtn  text-center "
          >
            Contact Us
          </Link>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
        <h2 className="text-center font-bold">Basic tutorial</h2>
        {isLoading && (
              <div className="w-full flex justify-center p-8">
                <Spinner size={50} />
              </div>
            )}
        <div
          className={`relative w-full pb-[56.25%] md:pb-[50%] lg:pb-[45%] h-0 ${isLoading ? "hidden" : ""}`}
        >
          {" "}
          <iframe
            onLoad={() => setIsLoading(false)}
            width="100%"
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/5xpwDEKXwDc?si=uHoarz_43Lto6QPb&amp;start=13"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
