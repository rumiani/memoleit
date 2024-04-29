import React, { useEffect, useState } from "react";
import NextClosest from "./nextClosest/nextClosest";
import LoadingPulse from "@/src/components/loading-comps/loadingPulse/loadingPulse";

export default function NoResult() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });
  return (
    <div className="flex w-full flex-col text-center justify-center">
      <NextClosest />
      {loading ? (
        <div className="w-full">
          <LoadingPulse />
        </div>
      ) : (
        <p className="text-red-500 mt-5">
          There is no item to review.
          <br />
          Please click on filters button and choose a category or add a new item
          to review.
        </p>
      )}
    </div>
  );
}
