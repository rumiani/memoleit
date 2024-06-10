import React, { useEffect, useState } from "react";
import Review from "./review/review";
import Filters from "./filters/filters";
import {
  allItemsReducer,
  itemReducer,
  numberOfItemsToReviewReducer,
} from "@/src/redux/slices/itemStateSlice";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import LoadingPulse from "../loading-comps/loadingPulse/loadingPulse";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { itemsToReviewWithActiveCategoryHandler } from "@/src/handlers/itemsToReviewWithActiveCategoryHandler";
import { IoIosCloudDone } from "react-icons/io";
import { numberOfItemsToReviewHandler } from "@/src/handlers/itemsToReviewHandler";

export default function DashboardPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const { items, numberOfItemsToReview } = useAppSelector(
    (state) => state.itemState
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const numberOfItems = await numberOfItemsToReviewHandler();
        if (numberOfItems)
          dispatch(numberOfItemsToReviewReducer(numberOfItems));
        const itemsToReview = await itemsToReviewWithActiveCategoryHandler();
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

  if (loading)
    return (
      <div className="w-52 mx-auto h-36 my-24">
        <LoadingPulse />
      </div>
    );
  return (
    <div className="relative flex flex-row justify-center">
      <div className="mt-6 sm:mb-24 flex flex-row ">
        <div>
          <div className="text-red-600 my-2">
            Items to review:
            <span className="font-bold px-1">{numberOfItemsToReview}</span>
          </div>
          {numberOfItemsToReview === 0 ? (
            <div>
              <div className="my-16">
                <IoIosCloudDone className="text-green-600 text-5xl w-36 h-36 mx-auto" />
                <span className="text-green-600">
                  You have reviewed all the items.
                </span>
              </div>
            </div>
          ) : (
            <Review />
          )}
        </div>
        <Filters />
      </div>
    </div>
  );
}
