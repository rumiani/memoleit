import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import TranslationComp from "./translationComp/translationComp";
import { FaClipboardList } from "react-icons/fa";
import { translatingItemsReducer } from "@/src/redux/slices/itemStateSlice";
import { isEmpty } from "lodash";
import Dialog from "@/src/components/general/dialog/dialog";

export default function TranslateTitle() {
  const { formData, translatingItems } = useAppSelector(
    (state) => state.itemState,
  );
  const [isDialogOpen, setDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          if (!isEmpty(formData.title.trim()))
            dispatch(translatingItemsReducer(formData.title));
          setDialogOpen(true);
        }}
        title={`There are ${Object.keys(translatingItems).length} items to add.`}
        className="absolute hover:text-gray-900 text-gray-600 top-1 right-2 text-3xl icon"
      >
        <FaClipboardList />
        <span className="absolute top-1 right-0 bg-red-500 min-w-4 w-fit px-1 rounded-full text-white text-xs">{Object.keys(translatingItems).length}</span>
      </button>
      <Dialog
        isOpen={isDialogOpen}
        closeDialogHandler={() => setDialogOpen(false)}
      >
        <div className="min-w-72 sm:w-96 h-96 overflow-y-auto">
          <TranslationComp />
        </div>
      </Dialog>
    </div>
  );
}
