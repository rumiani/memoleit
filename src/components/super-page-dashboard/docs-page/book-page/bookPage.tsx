import React, { useEffect, useState } from "react";
import { db } from "@/src/services/db";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { makeUrlFriendly } from "@/src/handlers/makeUrlFriendly";
import DocContainer from "./docContainer/docContainer";
import { toast } from "react-toastify";
import { capitalize } from "lodash";

export default function BookPage({ id }: { id: string }) {
  const { category } = useAppSelector((state) => state.itemState.formData);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {    
    db.pdfs.get(id).then((book) => {
      if (!book) return toast.error("PDF was not found");
      dispatch(formDataReducer({ category: makeUrlFriendly(book.name) }));
      const blob = new Blob([book?.file!], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    });

    const handleSelectionChange = async () => {
      const setting = await db.setting.where("name").equals("setting").first();
      if (!setting?.leitnerTextSelectionMode!) return;
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const selectedText = selection.toString().trim();
        if (selectedText.length > 0)
          dispatch(formDataReducer({ title: selectedText }));
      }
    };
    document.addEventListener("selectionchange", handleSelectionChange);
    return () =>
      document.removeEventListener("selectionchange", handleSelectionChange);
  }, [id, dispatch]);

  return (
    <div className="w-full h-screen my-4">
      {pdfUrl && (
        <div className="relative">
          <h1 className="font-bold text-center">{capitalize(category)}</h1>
          <DocContainer pdfUrl={pdfUrl} />
        </div>
      )}
    </div>
  );
}
