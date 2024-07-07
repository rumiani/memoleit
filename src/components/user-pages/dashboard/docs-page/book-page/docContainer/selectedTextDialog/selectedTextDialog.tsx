import React from "react";
import Dialog from "@/src/components/general/dialog/dialog";
import HilightedTextDialog from "../../selectionModal/HilightedTextDialog/HilightedTextDialog";

export default function SelectedTextDialog({
  isOpen,
  setDialogOpen,
}: {
  isOpen: boolean;
  setDialogOpen: Function;
}) {
  return (
    <div className="fixed z-50">
      <Dialog isOpen={isOpen} onClose={() => setDialogOpen(false)}>
        <HilightedTextDialog />
      </Dialog>
    </div>
  );
}
