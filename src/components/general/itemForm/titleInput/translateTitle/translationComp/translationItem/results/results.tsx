import React from "react";
import LongResults from "../longResults/longResults";
import ShortResult from "../shortResult/shortResult";

export default function Results({
  showMore,
  setShowMore,
  translatingItem,
}: {
  showMore: boolean;
  setShowMore: Function;
  translatingItem: string;
}) {
  return (
    <div className="w-full max-h-72 overflow-y-auto">
      {showMore ? (
        <LongResults
          translatingItem={translatingItem}
          setShowMore={setShowMore}
        />
      ) : (
        <ShortResult
          translatingItem={translatingItem}
          setShowMore={setShowMore}
        />
      )}
    </div>
  );
}
