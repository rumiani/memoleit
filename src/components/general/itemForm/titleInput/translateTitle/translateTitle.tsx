import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import Dialog from "../../../dialog/dialog";
import TranslationComp from "./translationComp/translationComp";
import { translatingItemsReducer } from "@/src/redux/slices/itemStateSlice";
import { isEmpty } from "lodash";
import { FaClipboardList } from "react-icons/fa";
export default function TranslateTitle() {
  const { title } = useAppSelector((state) => state.itemState.formData);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { translatingItems } = useAppSelector((state) => state.itemState);

  const dispatch = useAppDispatch();
  return (
    <div>
      <button
        type="button"
        onClick={(e) => {
          setDialogOpen(true);
          if (!translatingItems.includes(title) && !isEmpty(title.trim()))
            dispatch(translatingItemsReducer([...translatingItems, title]));
        }}
        className="absolute hover:text-gray-900 text-gray-600 top-1 right-2 text-3xl icon"
      >
        <FaClipboardList className=""/>
      </button>
      <Dialog isOpen={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <TranslationComp setDialogOpen={setDialogOpen} />
      </Dialog>
    </div>
  );
}
