import Dialog from "@/src/components/general/dialog/dialog";
import ImgHoverZoom from "@/src/components/general/imgHoverZoom/imgHoverZoom";
import React, { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import csvFormatImage from "@/public/assets/images/scv-format.png";
export default function TextInfo() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);

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
        <div className="relative text-lg">
          <p>The JSON format is the default export format of the app.</p>
          <p>You can only import the exported file from this app.</p>
          <p>If you do not have a json format, then uce a SCV file exported from a spreadsheet app.</p>
          
        </div>
      </Dialog>
    </>
  );
}
