"use client";
import React, { useEffect, useState } from "react";
import NoResult from "./noResult/noResult";
import { useAppSelector } from "@/src/app/hooks";
import ReviewItemCard from "./reviewItem/reviewItemCard";
import { itemTypes } from "@/src/types/interface";
import LoadingPulse from "../../loading-comps/loadingPulse/loadingPulse";
import { itemsToReviewHandler } from "@/src/handlers/itemsToReviewHandler";

export default function Review() {
  const [itemState, setItemState] = useState<itemTypes | null>(null);
  const { item, items } = useAppSelector((state) => state.appState);
  useEffect(() => {
    setItemState(item);
    console.log(items);
  }, [item, items]);
  return (
    <div className="mt-24">
      {itemState ? (
        item.id !== "" ? (
          <div>
            <p>Items to review: {itemsToReviewHandler().length}</p>
            <ReviewItemCard item={item} />
          </div>
        ) : (
          <NoResult />
        )
      ) : (
        <LoadingPulse />
      )}
    </div>
  );
}
