import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import Dialog from "../../../dialog/dialog";
import TranslationComp from "./translationComp/translationComp";
import { FaClipboardList } from "react-icons/fa";
import { translatingItemsReducer } from "@/src/redux/slices/itemStateSlice";
import { isEmpty } from "lodash";

export default function TranslateTitle() {
  const { formData } = useAppSelector((state) => state.itemState);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <div>
      {!isEmpty(formData.title.trim()) && (
        <button
          type="button"
          onClick={() => {
            dispatch(translatingItemsReducer(formData.title));
            setDialogOpen(true);
          }}
          className="absolute hover:text-gray-900 text-gray-600 top-1 right-2 text-3xl icon"
        >
          <FaClipboardList />
        </button>
      )}
      <Dialog isOpen={isDialogOpen} closeBtn closeDialogHandler={()=> setDialogOpen(false)}>
        <div className="min-w-72 sm:w-96 h-96 overflow-y-auto">
          <TranslationComp />
        </div>
      </Dialog>
    </div>
  );
}
