import Dialog from "@/src/components/general/dialog/dialog";
import ImgHoverZoom from "@/src/components/general/imgHoverZoom/imgHoverZoom";
import React, { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import csvFormatImage from "@/public/assets/images/scv-format.png"
export default function CsvInfo() {
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
        <div className="relative">
          <div className="flex flex-col items-start">
            <h2 className="text-center font-bold">
              This is the proper format for a CSV file:
            </h2>
            <div className="w-full max-96 p-4">

            <ImgHoverZoom src={csvFormatImage} alt="CSV format" />
            <p className="text-black text-center text-sm">CSV Format</p>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
