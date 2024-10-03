import React from "react";
import { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import Dialog from "@/src/components/general/dialog/dialog";

export default function GroqInfo({ words }: { words: string[] }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  return (
    <div className="flex justify-start relative">
      <button
        onClick={openDialog}
        title="This is the progress bar"
        className="text-md text-gray-400 hover:text-gray-900 rounded-full h-6"
      >
        <IoInformationCircleOutline className="text-2xl" />
      </button>

      <Dialog isOpen={isDialogOpen} closeBtn closeDialogHandler={closeDialog}>
        <div className="text-start">
          <h2 className="text-center font-bold">AI story generator</h2>
          <br />
          - You ask AI to give you a story based on the words that are ready to
          to be reviewed.
          <br />- You can filter out fewer categories to have a shorter story.
        </div>
        <div className="text-start my-4">
          <strong>Selected words to review:</strong> <br />{" "}
          <span className="text-blue-500">{words.join(", ")}</span>
        </div>
      </Dialog>
    </div>
  );
}
