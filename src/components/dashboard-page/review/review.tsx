"use client";
import React, { useEffect, useState } from "react";
import NoResult from "./noResult/noResult";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import ReviewItemCard from "./reviewItem/reviewItemCard";
import LoadingPulse from "../../loading-comps/loadingPulse/loadingPulse";
import { itemsToReviewHandler } from "@/src/handlers/itemsToReviewHandler";
import {
  allItemsReducer,
  itemReducer,
} from "@/src/redux/slices/itemStateSlice";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";

export default function Review() {
  const { item, items } = useAppSelector((state) => state.itemState);
  const [foundItem, setFoundItem] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  useEffect(() => {
    itemsToReviewHandler()
      .then((items) => {
        console.log(items);

        if (items && items.length > 0) {
          const newRandomItem = randomItemHandler(items);
          dispatch(itemReducer(newRandomItem));
          dispatch(allItemsReducer(items));

          setLoading(false);
          setFoundItem(true);
        } else {
          setLoading(false);
          setFoundItem(false);
        }
      })
      .catch(() => {
        console.log("Error");
      });
  }, [dispatch]);
  if (loading)
    return (
      <>
        <div className="w-full">
          <LoadingPulse />
        </div>
      </>
    );
  return (
    <div className="my-4">
      {foundItem ? (
        <div>
          <p>Items to review: {items.length}</p>
          <ReviewItemCard item={item} />
        </div>
      ) : (
        <NoResult />
      )}
    </div>
  );
}
