import React, { useEffect, useState } from "react";
import { closestItemToReview } from "@/src/handlers/closestItemToReview";
import { timeToNowHandler } from "@/src/handlers/home/general/timeToNowHandler";
export default function NextClosest() {
  const [timeToNextReview, setTimeToNextReview] = useState<{
    days: number;
    hours: number;
    min: number;
  } | null>(null);
  useEffect(() => {
    const timeToReview = closestItemToReview();
    if (timeToReview) {
      const time = timeToNowHandler(timeToReview);
      if (time) {
        setTimeToNextReview({
          days: time.days,
          hours: time.hours,
          min: time.min,
        });
      }
    }
  }, []);
  return (
    <div className="mx-auto my-16">
      {timeToNextReview && (
        <div>
          <span className="font-bold">Time to review the next item: </span>
          {timeToNextReview?.days === 0 ? (
            <span>
              {timeToNextReview.hours +
                " h " +
                timeToNextReview.min +
                " m"}
            </span>
          ) : (
            <span>{timeToNextReview?.days + " Days"}</span>
          )}
        </div>
      )}
    </div>
  );
}
