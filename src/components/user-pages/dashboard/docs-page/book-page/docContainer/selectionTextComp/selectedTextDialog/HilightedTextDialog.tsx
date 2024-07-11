import React from "react";
import AddToLeitner from "./addToLeitner/addToLeitner";
import Dictionary from "./dictionary/dictionary";
import Dialog from "@/src/components/general/dialog/dialog";
export default function HilightedTextDialog({
  isOpen,
  setDialogOpen,
}: {
  isOpen: boolean;
  setDialogOpen: Function;
}) {
  return (
    <div className="fixed z-50 flex flex-col gap-4 my-2 p-4 h-96 overflow-y-scroll">
      <Dialog isOpen={isOpen} onClose={() => setDialogOpen(false)}>
        <p>Highlighted Text:</p>
        <Dictionary />
        <AddToLeitner />
      </Dialog>
    </div>
  );
}
