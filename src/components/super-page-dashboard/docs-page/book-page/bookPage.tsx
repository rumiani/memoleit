import React, { useEffect, useState } from "react";
import { db } from "@/src/services/db";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { useAppDispatch } from "@/src/app/hooks";
import { makeUrlFriendly } from "@/src/handlers/makeUrlFriendly";
import DocContainer from "./docContainer/docContainer";

export default function BookPage({ id }: { id: string }) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    db.pdfs.get(id).then((book) => {
      if (book)
        dispatch(formDataReducer({ category: makeUrlFriendly(book.name) }));
      const blob = new Blob([book?.file!], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    });

    db.setting
      .where("name")
      .equals("setting")
      .first()
      .then((setting) => {
        if (!setting?.leitnerTextSelectionMode!) return;
        const handleSelectionChange = () => {
          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            const selectedText = selection.toString().trim();
            if (selectedText.length > 0) {
              dispatch(formDataReducer({ title: selectedText }));
            }
          }
        };
        document.addEventListener("selectionchange", handleSelectionChange);
        return () => {
          document.removeEventListener(
            "selectionchange",
            handleSelectionChange
          );
        };
      });
  }, [id, dispatch]);

  return (
    <div className="relative my-4">
      <h1 className="font-bold text-center">PDF Viewer</h1>
      <div>
        {pdfUrl && (
          <div className="relative">
            <DocContainer pdfUrl={pdfUrl} />
          </div>
        )}
      </div>
    </div>
  );
}
