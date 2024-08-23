import { useEffect, useState } from "react";
import { db } from "@/src/services/db";
import { MdAddBox } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import {
  formDataReducer,
  translatingItemsReducer,
} from "@/src/redux/slices/itemStateSlice";
import Dialog from "@/src/components/general/dialog/dialog";
import NewItemForm from "@/src/components/general/itemForm/newItemForm";
import { isEmpty } from "lodash";
import { isDocsPage } from "@/src/handlers/general/isPage";
import { usePathname } from "next/navigation";

export default function SelectionTextComp() {
  const path = usePathname();
  const { pdf } = useAppSelector((state) => state.pdfState);
  const { translatingItems } = useAppSelector((state) => state.itemState);
  const [highlightedText, setHighlightedText] = useState<string>("");
  const [position, setPosition] = useState<{
    top: string;
    left: string;
  }>({ top: "", left: "" });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  const closeDialog = () => setDialogOpen(false);
  
  useEffect(() => {
    const handleSelectionChange = async (event: {
      preventDefault: () => void;
    }) => {
      setHighlightedText("");

      event.preventDefault();
      document.addEventListener("contextmenu", (e) => e.preventDefault());

      const setting = await db.setting.where("name").equals("setting").first();
      if (!setting?.leitnerTextSelectionMode!) return;

      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        if (rect.left && rect.top) {
          setPosition({ left: rect.left + "px", top: rect.top - 50 + "px" });
        }
        setHighlightedText(selection.toString().replace(/[^a-zA-Z]/g, ""));
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [highlightedText]);

  return (
    <div>
      <Dialog isOpen={isDialogOpen} closeBtn closeDialogHandler={closeDialog}>
        <div className="overflow-y-auto h-96 sm:px-16">
          <NewItemForm />
        </div>
      </Dialog>
      {!isEmpty(highlightedText) && (
        <button
          style={{ zIndex: 999, top: position?.top, left: position?.left }}
          className="fixed z-50 animate-merge flex-col text-green-700 w-10 h-10  cursor-pointer p-1 rounded-md"
          onClick={() => {
            setDialogOpen(true);
            dispatch(
              formDataReducer({
                title: highlightedText,
                category: isDocsPage(path) ? pdf.name : "",
              }),
            );
            if (
              !Object.keys(translatingItems).includes(highlightedText) &&
              !isEmpty(highlightedText.trim())
            ) {
              dispatch(translatingItemsReducer(highlightedText));
            }
            setHighlightedText("");
            window.getSelection()!.removeAllRanges();
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
