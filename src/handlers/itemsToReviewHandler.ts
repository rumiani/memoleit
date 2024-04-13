import { categoryTypes, itemTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";
import { timeToNowHandler } from "./home/general/timeToNowHandler";
type ReviewBoxesType = {
  [key: number]: number;
};
const reviewBoxes: ReviewBoxesType = { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 };

export const itemsToReviewHandler = () => {
  if (typeof window !== "undefined") {
    const appData = getAppDataHandler();
    const { itemsData, categories } = appData;
    if (itemsData.length > 0) {
      const itemsToReview = itemsData.filter((item: itemTypes) => {
        const daysSinceReviewed = timeToNowHandler(
          item.reviews.lastReviewDate
        ).days;
        const categoryStatus = categories.find(
          (category: categoryTypes) => category.name === item.category
        ).status;

        // conditions
        const isInTheBox = item.reviews.box < 6;
        const isTimeToReview =
          daysSinceReviewed >= reviewBoxes[item.reviews.box];

        return categoryStatus && isInTheBox  //&& isTimeToReview;
      });
      return itemsToReview;
    }
  }
};
