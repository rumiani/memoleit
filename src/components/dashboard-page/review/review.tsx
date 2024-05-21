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
  const { item } = useAppSelector((state) => state.itemState);
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  useEffect(() => {
    itemsToReviewHandler()
      .then((items) => {
        if (items && items.length > 0) {
          const newRandomItem = randomItemHandler(items);
          dispatch(itemReducer(newRandomItem));
          dispatch(allItemsReducer(items));
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        console.log("Error");
      });
  }, [dispatch]);
  if (loading)
    return (
      <>
        <div className="w-full my-24">
          <LoadingPulse />
        </div>
      </>
    );
  return (
    <div className="my-4">
      {item.id === "" ? <NoResult /> : <ReviewItemCard item={item} />}
    </div>
  );
}
