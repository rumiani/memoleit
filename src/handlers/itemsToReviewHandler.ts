import { itemTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";
import { daysToNowHandler } from "./home/general/daysToNowHandler";

// These are the 6 boxes.Box zero means the learning proccess hasn't started yet.
const reviewBoxes = [0, 1, 3, 7, 15, 31];

export const itemsToReviewHandler = () => {
  if (typeof window !== "undefined") {
    let { itemsData, catagories } = getAppDataHandler();
    if (itemsData.length > 0) {
      return itemsData.filter((item: itemTypes) => {
        const daysSinceReviewed = daysToNowHandler(item.reviews.startedAt);
        // conditions
        const isInTheBox = item.reviews.box < 6;
        const isCategorySelected = catagories[item.catagory];
        const isTimeToReview =
          daysSinceReviewed >= reviewBoxes[item.reviews.box];

        return isInTheBox && isCategorySelected && isTimeToReview;
      });
    }
  }
};
