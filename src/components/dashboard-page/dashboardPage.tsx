import React, { useEffect, useState } from "react";
import Review from "./review/review";
import Filters from "./filters/filters";
import {
  allItemsReducer,
  itemReducer,
} from "@/src/redux/slices/itemStateSlice";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { itemsToReviewHandler } from "@/src/handlers/itemsToReviewHandler";
import LoadingPulse from "../loading-comps/loadingPulse/loadingPulse";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
export default function DashboardPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const { items } = useAppSelector((state) => state.itemState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsToReview = await itemsToReviewHandler();
        if (itemsToReview) {
          dispatch(allItemsReducer(itemsToReview));
          const newRandomItem = randomItemHandler(itemsToReview);
          dispatch(itemReducer(newRandomItem));
          setLoading(false);
        }
      } catch (error) {
        console.log("Error");
      }
    };
    fetchItems();
  }, [dispatch]);
  return (
    <div className="flex flex-row justify-center">
      <Filters />
      <div className="mt-6 sm:mb-24 ">
        <div className="">
          <div className="text-red-600">
            Items to review:
            <span className="font-bold px-1">{items.length}</span>
          </div>
          {loading ? (
            <div className="w-52 h-36 my-24">
              <LoadingPulse />
            </div>
          ) : (
            <Review />
          )}
        </div>
      </div>
    </div>
  );
}
