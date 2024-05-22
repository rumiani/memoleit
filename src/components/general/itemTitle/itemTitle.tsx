import React from "react";
import Speaker from "../speaker/speaker";
import { capitalize } from "lodash";
import { useAppSelector } from "@/src/app/hooks";

export default function ItemTitle({ title }: { title: string }) {
  const { isTextToSpeechOn } = useAppSelector((state) => state.settingState);

  return (
    <div className=" relative my-8">
      {isTextToSpeechOn && (
        <span className="absolute">
          <Speaker text={title} />
        </span>
      )}
      <h3 id="title" className="text-2xl font-bold  text-center">
        {capitalize(title)}
      </h3>
    </div>
  );
}
