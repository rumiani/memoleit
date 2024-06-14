import React, { useState } from "react";
import { GoTriangleDown } from "react-icons/go";
import HilightedTextDialog from "./HilightedTextDialog/HilightedTextDialog";
import { toast } from "react-toastify";
import { useAppSelector } from "@/src/app/hooks";
import Dialog from "@/src/components/general/dialog/dialog";
interface SelectionTypes {
  highlightPosition: {
    top: number;
    left: number;
  } | null;
}
export default function SelectionModal({ highlightPosition }: SelectionTypes) {
  const { title: highlightedText } = useAppSelector(
    (state) => state.itemState.formData
  );

  const [isDialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => {
    if (highlightedText.trim() === "")
      return toast.error("You have not highlighted any text");
    setDialogOpen(true);
  };

  return (
    <div className="z-50">
      {highlightPosition && (
        <div className="flex flex-col">
          <button
            onClick={openDialog}
            className="absolute z-50 group cursor-pointer bg-gray-900 flex text-center items-center text-gray-400 hover:text-white h-8 w-20 px-2 rounded-lg"
            style={{
              top: highlightPosition.top - 160 + "px",
              left: highlightPosition.left - 90 + "px",
            }}
          >
            Options
            <GoTriangleDown className="absolute text-gray-900 text-5xl top-3 left-auto" />
          </button>
        </div>
      )}
      <Dialog isOpen={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <HilightedTextDialog />
      </Dialog>
    </div>
  );
}
