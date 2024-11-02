import React from "react";
import { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import Dialog from "@/src/components/general/dialog/dialog";
import { useAppSelector } from "@/src/app/hooks";
import { EssayObjectTypes } from "@/src/types/interface";

export const EssayInfo = ({ essay }: { essay: EssayObjectTypes }) => {
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
        <div>
          <h2 className="text-center font-bold">Your essay</h2>
          <div className="h-96 text-start overflow-y-auto">
            <div className="flex flex-col">
              <strong>Topic</strong>
              <p className="px-2">{essay.topic}</p>
            </div>
            <div className="flex flex-col">
              <strong>Essay</strong>
              <p className="px-2">{essay.body}</p>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
