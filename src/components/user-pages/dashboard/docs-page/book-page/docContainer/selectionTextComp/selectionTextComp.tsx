import React, { useEffect, useState } from "react";
import getPosition from "./handlers/getPosition";
import { db } from "@/src/services/db";
import { MdAddBox } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { useAppDispatch } from "@/src/app/hooks";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import HilightedTextDialog from "./selectedTextDialog/HilightedTextDialog";

export default function SelectionTextComp() {

  const [highlightedText, setHighlightedText] = useState<string>("");
  const [position, setPosition] = useState<{
    top: string;
    left: string;
  }>({ top: "", left: "" });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleSelectionChange = async (event: {
      preventDefault: () => void;
    }) => {
      event.preventDefault();
      document.addEventListener("contextmenu", (e) => e.preventDefault());
      setHighlightedText("");
      const setting = await db.setting.where("name").equals("setting").first();
      if (!setting?.leitnerTextSelectionMode!) return;
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
  });
  return (
    <div>
      <HilightedTextDialog
        isOpen={isDialogOpen}
        setDialogOpen={setDialogOpen}
      />
      {highlightedText.length > 0 && (
        <button
          style={{ top: position?.top, left: position?.left }}
          className="fixed z-50 flex-col text-green-700 w-10 h-10  cursor-pointer p-1 rounded-md"
          onClick={() => {
            dispatch(formDataReducer({ title: highlightedText }));
            setDialogOpen(true);
            setHighlightedText("");
          }}
        >
          <div className="flex flex-col justify-center items-center">
            <MdAddBox className="w-10 h-10 bg-white" />
            <FaCaretDown className="relative text-lg bottom-3" />
          </div>
        </button>
      )}
    </div>
  );
}
