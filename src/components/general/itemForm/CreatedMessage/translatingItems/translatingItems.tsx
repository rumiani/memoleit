import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import {
  formDataReducer,
  removeTranslationItemReducer,
} from "@/src/redux/slices/itemStateSlice";
import { capitalize } from "lodash";
import React from "react";

export default function TranslatingItems({
  setCreatedMessage,
}: {
  setCreatedMessage: Function;
}) {
  const { translatingItems } = useAppSelector(({ itemState }) => itemState);
  const dispatch = useAppDispatch();

  return (
    <div className="w-72 flex flex-wrap gap-1">
      {Object.keys(translatingItems).map((translatingItem, i) => (
        <div
          key={i}
          className="w-fit flex flex-col justify-center items-center bg-gray-100 rounded-md p-2"
        >
          <p>{capitalize(translatingItem)}</p>
          <div className="flex flex-row">
            <span
              onClick={() => {
                dispatch(formDataReducer({ title: translatingItem }));
                setCreatedMessage(false);
              }}
              className="icon text-3xl text-green-600"
            >
              +
            </span>
            <span
              onClick={() =>
                dispatch(removeTranslationItemReducer(translatingItem))
              }
              className="icon text-3xl text-red-500"
            >
              -
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
