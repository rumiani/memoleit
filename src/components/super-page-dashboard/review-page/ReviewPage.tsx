import React, { useEffect, useState } from "react";
import Review from "./review/review";
import Filters from "./filters/filters";
import {
  allItemsReducer,
  itemReducer,
  numberOfItemsToReviewReducer,
} from "@/src/redux/slices/itemStateSlice";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import LoadingPulse from "../../general/loading-comps/loadingPulse/loadingPulse";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { itemsToReviewWithActiveCategoryHandler } from "@/src/handlers/itemsToReviewWithActiveCategoryHandler";
import { IoIosCloudDone } from "react-icons/io";
import { numberOfItemsToReviewHandler } from "@/src/handlers/itemsToReviewHandler";

export default function ReviewPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const { numberOfItemsToReview } = useAppSelector((state) => state.itemState);
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
    <div className="relative flex flex-col justify-center">
      <Filters />
      <div className="flex justify-center text-center sm:mb-24">
        <div>
          {numberOfItemsToReview === 0 ? (
            <div className="my-16 flex flex-col items-center">
              <span className="text-green-600">
                There is no item to review.
              </span>
              <IoIosCloudDone className="text-green-600 text-5xl w-36 h-36" />
            </div>
          ) : (
            <div>
              <div className="text-red-600 -mt-4 mb-2">
                Items to review:
                <span className="font-bold px-1">{numberOfItemsToReview}</span>
              </div>
              <Review />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
