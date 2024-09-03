import Dialog from "@/src/components/general/dialog/dialog";
import React, { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import Spinner from "@/src/components/general/loading-comps/spinner/spinner";

export default function BooksInfo() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <button
        onClick={openDialog}
        title="Check out the tutorial"
        className="text-sm text-gray-600 hover:text-gray-900 rounded-full"
      >
        <IoInformationCircleOutline className="text-lg" />
      </button>

      <Dialog
        isOpen={isDialogOpen}
        closeBtn
        closeDialogHandler={() => setDialogOpen(false)}
      >
        <div className="relative">
          <div className="flex flex-col items-start">
            <h2 className="text-center font-bold">
              Add PDF books to the app and study:
            </h2>
            <p className="mb-4">
              Highlight new words to check their meaning and pronunciation, then
              add them to the Leitner box for later review, all without
              interrupting your reading.
            </p>{" "}
            <span className="text-gray-600">Watch the video bellow:</span>
            {isLoading && (
              <div className="w-full flex justify-center p-8">
                <Spinner size={50} />
              </div>
            )}
            <div className={`relative w-full pb-[56.25%] md:pb-[50%] lg:pb-[45%] h-0 ${isLoading ? 'hidden' : ''}`}>
              {" "}
              <iframe
                onLoad={() => setIsLoading(false)}
                width="100%"
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/5xpwDEKXwDc?si=uHoarz_43Lto6QPb&amp;start=77"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
