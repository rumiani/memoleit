import React from "react";
import { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import Dialog from "@/src/components/general/dialog/dialog";

export default function WritingInfo() {
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
          <h2 className="text-center font-bold">AI essay analyser</h2>
          <br />
          - Write an essay and ask for AI alnelise it.
          <br />- Here are the criteries that AI will anelise your essay based
          on:
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </div>
        <div className="text-start my-4">
          <strong>Selected words to review:</strong> <br />{" "}
        </div>
      </Dialog>
    </div>
  );
}
