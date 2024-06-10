import React from "react";
import Speaker from "../textToSpeech/textToSpeech";
import { capitalize } from "lodash";
import { useAppSelector } from "@/src/app/hooks";
import Link from "next/link";
import { ItemTypes } from "@/src/types/interface";

export default function ItemTitle({item}:{item:ItemTypes}) {
  const { isTextToSpeechOn } = useAppSelector((state) => state.settingState);
  return (
    <div className=" relative my-8">
      {isTextToSpeechOn && (
        <span className="absolute second-element">
          <Speaker text={item.title} />
        </span>
      )}
      <Link href={`/box/item/${item.id}`}>
      <h3 id="title" className="text-2xl font-bold  text-center">
        {capitalize(item.title)}
      </h3>
      </Link>
    </div>
  );
}
