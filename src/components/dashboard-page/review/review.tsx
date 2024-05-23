"use client";
import React, { useEffect, useState } from "react";
import NoResult from "./noResult/noResult";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import ReviewItemCard from "./reviewItem/reviewItemCard";
import LoadingPulse from "../../loading-comps/loadingPulse/loadingPulse";
import {
  itemReducer,
} from "@/src/redux/slices/itemStateSlice";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { selectedItemsToReviewHandler } from "@/src/handlers/selectedItemsToReviewHandler";

export default function Review() {
  const { item, items } = useAppSelector((state) => state.itemState);
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  useEffect(() => {
    selectedItemsToReviewHandler()
      .then((items) => {
        if (items && items.length > 0) {
          const newRandomItem = randomItemHandler(items);
          dispatch(itemReducer(newRandomItem));
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
      {item.id === "" ? (
        <div>
          <NoResult />
        </div>
      ) : (
        <ReviewItemCard />
      )}
    </div>
  );
}
