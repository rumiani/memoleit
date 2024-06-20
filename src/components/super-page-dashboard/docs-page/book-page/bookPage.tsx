import React, { useEffect, useRef, useState } from "react";
import { db } from "@/src/services/db";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { useAppDispatch } from "@/src/app/hooks";
import { makeUrlFriendly } from "@/src/handlers/makeUrlFriendly";
import Dialog from "@/src/components/general/dialog/dialog";
import HilightedTextDialog from "./selectionModal/HilightedTextDialog/HilightedTextDialog";
import DocContainer from "./docContainer/docContainer";

export default function BookPage({ id }: { id: string }) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const documentElement = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleTextHighlight = async () => {
    const setting = await db.setting.where("name").equals("setting").first();
    if (!setting?.leitnerTextSelectionMode!) return;
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      if (selection.toString().trim().length > 0) {
        dispatch(formDataReducer({ title: selection.toString() }));
      }
    } else {
      setDialogOpen(false);
    }
  };

  useEffect(() => {
    // const container = containerRef.current;
    db.pdfs.get(id).then((book) => {
      if (book)
        dispatch(formDataReducer({ category: makeUrlFriendly(book.name) }));
      const blob = new Blob([book?.file!], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    });
  }, [id, dispatch]);

  return (
    <div className="relative my-4">
      <h1 className="font-bold text-center">PDF Viewer</h1>
      <div>
        {pdfUrl && (
          <div onMouseUp={handleTextHighlight} ref={documentElement}>
            <DocContainer
              pdfUrl={pdfUrl}
              openDialog={() => setDialogOpen(true)}
              documentElement={documentElement.current!}
            />
          </div>
        )}
      </div>
      <Dialog
        isOpen={isDialogOpen}
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
