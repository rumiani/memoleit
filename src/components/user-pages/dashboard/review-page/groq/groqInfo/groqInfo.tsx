import React from "react";
import { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import Dialog from "@/src/components/general/dialog/dialog";

export default function GroqInfo() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  return (
    <div className="flex justify-start relative">
      <button
        onClick={openDialog}
        title="This is the progress bar"
        className="text-md text-gray-400 hover:text-gray-900 rounded-full"
      >
        <IoInformationCircleOutline className="text-2xl" />
      </button>

      <Dialog isOpen={isDialogOpen} closeBtn closeDialogHandler={closeDialog}>
        <div className="text-start">
          <strong >AI story generator</strong>
          <br />
          - You ask AI to give you a story about the words that are ready to
          review.
          <br />
          - You can filter out fewer categories to have a shorter story.
        </div>
      </Dialog>
    </div>
  );
}
