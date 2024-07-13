import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { MdOutlineTranslate } from "react-icons/md";
import Dialog from "../../../dialog/dialog";
import { IoMdOptions } from "react-icons/io";
import TranslationComp from "./translationComp/translationComp";
import { translatingItemsReducer } from "@/src/redux/slices/itemStateSlice";
import { isEmpty } from "lodash";
export default function TranslateTitle() {
  const { title } = useAppSelector((state) => state.itemState.formData);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { translatingItems } = useAppSelector((state) => state.itemState);

  const dispatch = useAppDispatch();
  return (
    <>
      {title.trim().length > 0 && (
        <div>
          <button
            type="button"
            onClick={() => {
              setDialogOpen(true);
              !translatingItems.includes(title) &&
                dispatch(translatingItemsReducer([...translatingItems, title]));
            }}
            className="absolute top-1 right-2 text-3xl icon"
          >
            <IoMdOptions />
          </button>
          <Dialog isOpen={isDialogOpen} onClose={() => setDialogOpen(false)}>
            <TranslationComp setDialogOpen={setDialogOpen} />
          </Dialog>
        </div>
      )}
    </>
  );
}
