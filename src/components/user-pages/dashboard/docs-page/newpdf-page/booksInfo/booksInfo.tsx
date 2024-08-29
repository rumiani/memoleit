import Dialog from "@/src/components/general/dialog/dialog";
import React, { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";

export default function BooksInfo() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);

  return (
    <div className="relative flex items-center">
      <button
        onClick={openDialog}
        title="This is the progress bar"
        className="absolute right-0 top-3 text-md text-gray-600 hover:text-gray-900 rounded-full"
      >
        <IoInformationCircleOutline className="text-2xl" />
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
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/5xpwDEKXwDc?si=uHoarz_43Lto6QPb&amp;start=77"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
