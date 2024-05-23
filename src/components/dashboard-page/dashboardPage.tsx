import React, { useEffect } from "react";
import Review from "./review/review";
import Filters from "./filters/filters";
import { db } from "@/src/services/db";
import { allItemsReducer } from "@/src/redux/slices/itemStateSlice";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { itemsToReviewHandler } from "@/src/handlers/itemsToReviewHandler";
import { IoIosCloudDone } from "react-icons/io";
export default function DashboardPage() {
  const { items } = useAppSelector((state) => state.itemState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    db.items
      .toArray()
      .then((items) => {
        if (items) {
          const itemsToReview = itemsToReviewHandler(items);
          dispatch(allItemsReducer(itemsToReview));
        }
      })
      .catch(() => {
        console.log("Error");
      });
  }, [dispatch]);
  return (
    <div className="flex flex-row justify-center">
      <Filters />
      <div className="mt-6 sm:mb-24 ">
        {items.length === 0 ? (
          <div className="my-16">
            <IoIosCloudDone className="text-green-600 text-5xl w-36 h-36 mx-auto" />
            <span className="text-green-600">
              You have reviewed all the items.
            </span>
          </div>
        ) : (
          <div className="">
            <div className="text-red-600">
              Items to review:
              <span className="font-bold px-1">{items.length}</span>
            </div>
            <Review />
          </div>
        )}
      </div>
    </div>
  );
}
