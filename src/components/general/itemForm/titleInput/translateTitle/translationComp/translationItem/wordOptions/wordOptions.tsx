import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import TextToSpeechSpeaker from "@/src/components/general/textToSpeech/textToSpeech";
import {
  formDataReducer,
  translatingItemsReducer,
} from "@/src/redux/slices/itemStateSlice";
import { capitalize } from "lodash";
import React from "react";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { MdOutlineTranslate } from "react-icons/md";

export default function WordOptions({
  translatingItem,
  lookUpHandler,
}: {
  translatingItem: string;
  lookUpHandler: Function;
}) {
  const dispatch = useAppDispatch();
  const { translatingItems } = useAppSelector((state) => state.itemState);

  return (
    <div className="flex flex-row justify-between gap-2 items-center">
      <p className="font-bold w-full overflow-x-auto">
        {capitalize(translatingItem)}
      </p>
      <div className="flex flex-row gap-1">
        <button
          type="button"
          onClick={() => lookUpHandler(translatingItem.replace(/[^a-zA-Z]/g, ''))}
          className=" icon text-2xl"
        >
          <MdOutlineTranslate />
        </button>
        <TextToSpeechSpeaker text={translatingItem} />
        <IoMdRemoveCircleOutline
          onClick={() => {
            dispatch(
              translatingItemsReducer(
                translatingItems.filter((item) => item !== translatingItem),
              ),
            );
            dispatch(formDataReducer({ title: "" }));
          }}
          className="icon !w-8 text-red-500"
        />
      </div>
    </div>
  );
}
