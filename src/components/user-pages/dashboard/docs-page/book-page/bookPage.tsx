import React, { useEffect, useState } from "react";
import { db } from "@/src/services/db";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { makeUrlFriendly } from "@/src/handlers/makeUrlFriendly";
import DocContainer from "./docContainer/docContainer";
import { toast } from "react-toastify";
import { capitalize } from "lodash";
import SelectedTextDialog from "./docContainer/selectedTextDialog/selectedTextDialog";
import { FaCaretDown } from "react-icons/fa";
import getPosition from "./selectionModal/handler/getPosition";
import { MdAddBox } from "react-icons/md";
import HilightedTextDialog from "./selectionModal/HilightedTextDialog/HilightedTextDialog";
export default function BookPage({ id }: { id: string }) {
  const { category, title } = useAppSelector(
    (state) => state.itemState.formData,
  );
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [highlightedText, setHighlightedText] = useState<string>("");

  const [position, setPosition] = useState<{
    top: string;
    left: string;
  }>({ top: "", left: "" });

  const [isDialogOpen, setDialogOpen] = useState(false);
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
      setHighlightedText("");
      const setting = await db.setting.where("name").equals("setting").first();
      if (!setting?.leitnerTextSelectionMode!) return;
      document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
      });
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        if (rect.left && rect.top) {
          const { left, top } = getPosition({ left: rect.left, top: rect.top });
          setPosition({ left, top });
        }
        setHighlightedText(selection.toString());
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [id, dispatch]);

  return (
    <div className="w-full h-screen my-4">
      {pdfUrl && (
        <div className="relative">
          <h1 className="font-bold text-center">{capitalize(category)}</h1>
          <DocContainer pdfUrl={pdfUrl} />
          <SelectedTextDialog
            isOpen={isDialogOpen}
            setDialogOpen={setDialogOpen}
          />
          {highlightedText.length > 0 && (
            <button
              style={{ top: position?.top, left: position?.left }}
              className="fixed flex-col text-green-700 w-10 h-10  cursor-pointer p-1 rounded-md"
              onClick={() => {
                dispatch(formDataReducer({ title: highlightedText }));

                setDialogOpen(true);
              }}
            >
              <div className="flex flex-col justify-center items-center">
                <MdAddBox className="w-10 h-10" />
                <FaCaretDown className="relative text-lg bottom-3" />
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
