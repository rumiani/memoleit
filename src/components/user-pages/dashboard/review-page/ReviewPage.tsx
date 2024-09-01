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

export default function ReviewPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const { numberOfItemsToReview } = useAppSelector((state) => state.itemState);
  const dispatch = useAppDispatch();
  const [userCount, setUserCount] = useState<number | null>(null);
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

    const fetchUserCount = async () => {
      try {
        const response = await fetch('/api/userCount');
        const data = await response.json();        
        setUserCount(data.count);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchUserCount();
  }, [dispatch]);

  if (loading)
    return (
      <div className="w-52 mx-auto h-36 my-24">
        <LoadingPulse />
      </div>
    );
  return (
    <div className="relative flex flex-col justify-center text-center my-8 sm:mt-4">
      <div>
        {numberOfItemsToReview === 0 ? (
          <div className="my-16 flex flex-col items-center">
            <span className="text-green-600">There is no item to review.</span>
            <IoIosCloudDone className="text-green-600 text-5xl w-36 h-36" />
          </div>
        ) : (
          <div>
            <div className="w-80 mx-auto my-4 flex flex-row items-center justify-between">
              <div className="text-red-600 text-xl">
                Items to review:
                <span className="font-bold px-1">{numberOfItemsToReview}</span>
              </div>
              <Filters />
            </div>
            <Review />
          </div>
        )}
      </div>
      {userCount && <div title="Number of users using this app" className=" cursor-default text-start w-80 px-1 font-bold text-sm mx-auto">Users: {userCount} </div>}
    </div>
  );
}
