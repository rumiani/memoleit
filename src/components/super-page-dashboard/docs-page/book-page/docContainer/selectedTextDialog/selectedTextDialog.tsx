import React from "react";
import { useAppDispatch } from "@/src/app/hooks";
import Dialog from "@/src/components/general/dialog/dialog";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import HilightedTextDialog from "../../selectionModal/HilightedTextDialog/HilightedTextDialog";

export default function SelectedTextDialog({
  isOpen,
  setDialogOpen,
}: {
  isOpen: boolean;
  setDialogOpen: Function;
}) {
  const dispatch = useAppDispatch();
  return (
    <div className="fixed z-50">
      <Dialog
        isOpen={isOpen}
        onClose={() => {
          dispatch(formDataReducer({ title: "" }));
          setDialogOpen(false);
        }}
      >
        <HilightedTextDialog />
      </Dialog>
    </div>
  );
}
