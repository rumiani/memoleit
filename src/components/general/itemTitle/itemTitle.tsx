import React from "react";
import Speaker from "../textToSpeech/textToSpeech";
import { capitalize } from "lodash";
import { useAppSelector } from "@/src/app/hooks";
import { ItemTypes } from "@/src/types/interface";

export default function ItemTitle({ item }: { item: ItemTypes }) {
  const { isTextToSpeechOn } = useAppSelector((state) => state.settingState);
  return (
    <div className="flex flex-row relative my-8">
      {isTextToSpeechOn && (
        <span className="absolute left-0 second-element">
          <Speaker text={item.title} />
        </span>
      )}
      <h3 id="title" className="text-xl w-2/3 overflow-scroll font-bold mx-auto text-center">
        {capitalize(item.title)}
      </h3>
    </div>
  );
}
