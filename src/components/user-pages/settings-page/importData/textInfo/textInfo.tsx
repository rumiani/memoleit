import Dialog from "@/src/components/general/dialog/dialog";
import React, { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";

export default function TextInfo() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);

  return (
    <>
      <button
        onClick={openDialog}
        title="Check out the tutorial"
        className=" text-gray-600 hover:text-gray-900 rounded-full"
      >
        <IoInformationCircleOutline className="text-lg" />
      </button>

      <Dialog
        isOpen={isDialogOpen}
        closeBtn
        closeDialogHandler={() => setDialogOpen(false)}
      >
        <div className="relative p-2 text-base">
          <strong>The JSON format is the default export format of the app.</strong>
          <p>If you do not have a <strong>JSON</strong> file exported from this app, then use a <strong>CSV</strong> file exported from a spreadsheet app.</p>
          
        </div>
      </Dialog>
    </>
  );
}
