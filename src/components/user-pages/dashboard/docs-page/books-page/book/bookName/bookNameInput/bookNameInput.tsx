import { useAppDispatch } from "@/src/app/hooks";
import { PdfStateTypes } from "@/src/types/interface";
import React, { useRef, useState } from "react";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  allPdfsReducer,
  pdfOnEditReducer,
} from "@/src/redux/slices/pdfStateSlice";
import { getPDFsHandler } from "../../../../handlers/getPDFshandler";
import { db } from "@/src/services/db";
import { categoryOnEditReducer } from "@/src/redux/slices/categoryStateSlice";

export default function BookNameInput({ book }: { book: PdfStateTypes }) {
  const [newBookName, setNewBookName] = useState<string>(book.name);
  const inputElement = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const changeCategoryNameHandler = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNewBookName(e.target.value);
  };

  const saveBookNameHandler = async () => {
    if (newBookName.length < 3 && inputElement.current)
      return inputElement.current.focus();
    try {
      const pdf = await db.pdfs.get(book.id);
      if (!pdf) return toast.error("PDF not found");
      await db.pdfs.put({ ...pdf, name: newBookName });
      toast.success("PDF name has been updated.");
      const pdfs = await getPDFsHandler();
      dispatch(allPdfsReducer(pdfs!));
      dispatch(pdfOnEditReducer(""));
    } catch (error: any) {
      if (error.name === "404") toast.error("Category not found.");
      console.log("Error");
    }
  };

  return (
    <div className="w-full relative flex flex-wrap">
      <input
        ref={inputElement}
        className="primaryInput !h-10"
        placeholder="PDF name"
        autoComplete="off"
        type="text"
        required
        value={newBookName}
        onChange={changeCategoryNameHandler}
      />
      {newBookName.length < 3 && (
        <p className="text-red-500 text-xs font-bold px-1">
          The input must be ≥ 3 letters
        </p>
      )}
      <div className="w-full flex flex-row justify-end mt-2">
        <button
          onClick={() => dispatch(pdfOnEditReducer(""))}
          className="redBtn !p-2 text-xl !w-fit"
          title="Save the category name"
        >
          Cancel
        </button>
        <button
          onClick={saveBookNameHandler}
          className="greenBtn !p-2 text-xl !w-fit"
          title="Save the category name"
        >
          Save
        </button>
      </div>
    </div>
  );
}
