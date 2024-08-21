import Dialog from "@/src/components/general/dialog/dialog";
import LeitnerPic from "@/src/components/general/item/itemInfo/leitnerPic";
import React, { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { IoMdCloseCircle } from "react-icons/io";
export default function BooksInfo() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  return (
    <div className="">
      <button
        onClick={openDialog}
        title="This is the progress bar"
        className=" text-md text-gray-600 hover:text-gray-900 rounded-full"
      >
        <IoInformationCircleOutline className="text-xl" />
      </button>

      <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
        <div className="relative pt-4">
          <IoMdCloseCircle
          onClick={closeDialog}
          className="absolute right-0 top-0 text-2xl cursor-pointer text-red-500" />
          <div className="flex flex-col items-start">
            Add PDF books to the app and study.
            <br />
            Highlight new words to check their meaning and pronunciation, then
            add them to the Leitner box for later review, all without
            interrupting your reading.
          </div>
        </div>
      </Dialog>
    </div>
  );
}
