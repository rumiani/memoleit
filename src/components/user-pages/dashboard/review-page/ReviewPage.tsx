import { useEffect, useState } from "react";
import Review from "./review/review";
import Filters from "./filters/filters";
import {
  allItemsReducer,
  itemReducer,
  numberOfItemsToReviewReducer,
} from "@/src/redux/slices/itemStateSlice";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import LoadingPulse from "../../../general/loading-comps/loadingPulse/loadingPulse";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { itemsToReviewWithActiveCategoryHandler } from "@/src/handlers/itemsToReviewWithActiveCategoryHandler";
import { IoIosCloudDone } from "react-icons/io";
import { numberOfItemsToReviewHandler } from "@/src/handlers/numberOfItemsToReviewHandler";
import StoryGenerator from "./storyGenerator/storyGenerator";

export default function ReviewPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const { numberOfItemsToReview, items } = useAppSelector(
    (state) => state.itemState,
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
      } catch (error) {}
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
    <div className="relative flex flex-col justify-center text-center my-8 sm:mt-4">
      {numberOfItemsToReview === 0 ? (
        <div className="my-16 flex flex-col items-center">
          <span className="text-green-600">There is no item to review.</span>
          <IoIosCloudDone className="text-green-600 text-5xl w-36 h-36" />
        </div>
      ) : (
        <div className="flex  flex-col justify-center lg:flex-row lg:justify-around gap-4 px-4">
          <div className="w-full lg:w-1/2 ">
            <div className="w-full max-w-80 mx-auto">
              <div className="flex flex-row items-center justify-between mb-1">
                <div className="text-gray-600 text-start text-sm ">
                  {items.length === 0 ? (
                    <span>
                      All items to review:{" "}
                      <strong>{numberOfItemsToReview}</strong>
                    </span>
                  ) : (
                    <span>
                      Selected items to review: <strong>{items.length}</strong>
                    </span>
                  )}
                </div>
                <Filters />
              </div>
              <Review />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <StoryGenerator />
          </div>
        </div>
      )}
    </div>
  );
}
