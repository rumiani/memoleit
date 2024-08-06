"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { db } from "@/src/services/db";
import { DialogOptions } from "@/src/components/general/dialogOptions/dialogOptions";
import { allPdfsReducer, pdfOnEditReducer } from "@/src/redux/slices/pdfStateSlice";
import { useAppDispatch } from "@/src/app/hooks";
import getPDFsHandler from "../../../handlers/getPDFsHandler";
import { PdfStateTypes } from "@/src/types/interface";

export default function BookOptions({ book }: { book: PdfStateTypes }) {
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useAppDispatch();
  const editHandler = () => {
    setShowOptions(false);
    dispatch(pdfOnEditReducer(book.id));
  };
  const removeBtnFunction = async () => {
    try {
      const foundPdf = await db.pdfs.get(book.id);
      if (!foundPdf) return toast.error("PDF not found.");
      await db.pdfs.delete(book.id);
      toast.success("PDF was removed.");
      const pdfs = await getPDFsHandler();
  
      dispatch(allPdfsReducer(pdfs!));
    } catch (error: any) {
      console.log("Error fetching pdfs");
    }
  };

  return (
    <div className="z-10 relative">
      <DialogOptions showOptions={showOptions} setShowOptions={setShowOptions}>
        <div className="flex flex-col gap-2">
          <button
            onClick={editHandler}
            className="optionsBtn text-yellow-500 hover:text-yellow-700 "
          >
            Edit Name
          </button>
          <button
            onClick={() => removeBtnFunction()}
            className="optionsBtn  text-red-400 hover:text-red-600"
          >
            Remove
          </button>
        </div>
      </DialogOptions>
    </div>
  );
}
