import { LookUpResultTypes } from "@/src/types/interface";
import React from "react";
import { FaChevronUp } from "react-icons/fa";
import Meanings from "./meanings/meanings";

export default function LongResults({
  lookUpResults,
  setDialogOpen,
  setShowMore,
}: {
  lookUpResults: LookUpResultTypes[];
  setDialogOpen: Function;
  setShowMore: Function;
}) {
  return (
    <ul className="w-full relative">
      <FaChevronUp
        title="See less"
        onClick={() => setShowMore(false)}
        className="absolute right-0 icon !p-2 cursor-pointer"
      />
      {lookUpResults.map((result, i) => {
        return (
          <ul key={i} className="flex flex-row gap-2 justify-between w-full mt-8">
            <Meanings result={result} setDialogOpen={setDialogOpen} />
          </ul>
        );
      })}
    </ul>
  );
}
