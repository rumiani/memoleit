import React from "react";
import LongResults from "../longResults/longResults";
import ShortResult from "../shortResult/shortResult";
import { LookUpResultTypes } from "@/src/types/interface";

export default function Results({
  showMore,
  setDialogOpen,
  setShowMore,
  lookUpResults,
  translatingItem,
}: {
  showMore: boolean;
  setDialogOpen: Function;
  setShowMore: Function;
  lookUpResults: LookUpResultTypes[];
  translatingItem: string;
}) {
  return (
    <div className="w-full max-h-72 overflow-y-auto">
      {showMore ? (
        <LongResults
          setDialogOpen={setDialogOpen}
          setShowMore={setShowMore}
          lookUpResults={lookUpResults}
        />
      ) : (
        <ShortResult
          translatingItem={translatingItem}
          setDialogOpen={setDialogOpen}
          setShowMore={setShowMore}
          lookUpResults={lookUpResults}
        />
      )}
    </div>
  );
}
