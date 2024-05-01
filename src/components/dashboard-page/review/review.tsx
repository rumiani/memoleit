"use client";
import React, { useEffect, useState } from "react";
import NoResult from "./noResult/noResult";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import ReviewItemCard from "./reviewItem/reviewItemCard";
import LoadingPulse from "../../loading-comps/loadingPulse/loadingPulse";
import { itemsToReviewHandler } from "@/src/handlers/itemsToReviewHandler";
import { ItemTypes } from "@/src/types/interface";
import { itemReducer } from "@/src/redux/slices/itemStateSlice";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";

export default function Review() {
  const { item } = useAppSelector((state) => state.itemState);
  const [foundItem, setFoundItem] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const newRandomItem = randomItemHandler();
    if (newRandomItem) dispatch(itemReducer(newRandomItem!));
    setFoundItem(true);
  }, [dispatch]);
  return (
    <div className="my-4">
      {foundItem ? (
        item.id !== "" ? (
          <div>
            <p>Items to review: {itemsToReviewHandler().length}</p>
            <ReviewItemCard item={item} />
          </div>
        ) : (
          <NoResult />
        )
      ) : (
        <div className="w-full">
          <LoadingPulse />
        </div>
      )}
    </div>
  );
}
