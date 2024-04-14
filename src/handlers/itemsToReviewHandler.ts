import { categoryTypes, itemTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";
import { timeToNowHandler } from "./home/general/timeToNowHandler";
type ReviewBoxesType = {
  [key: number]: number;
};
const reviewBoxes: ReviewBoxesType = { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 };

export const itemsToReviewHandler = () => {
  if (typeof window !== "undefined") {
    const { itemsData, categories } = getAppDataHandler();
    if (itemsData.length > 0) {
      const itemsToReview = itemsData.filter((item: itemTypes) => {
        const daysSinceReviewed = timeToNowHandler(
          item.reviews.lastReviewDate
        ).days;
        console.log(categories);

        const category = categories.find(
          (category: categoryTypes) => category.name === item.category
        );

        // conditions
        const isInTheBox = item.reviews.box < 6;
        const isTimeToReview =
          daysSinceReviewed >= reviewBoxes[item.reviews.box];

        return (
          category.status &&
          isInTheBox &&
          (item.reviews.box === 0 || isTimeToReview)
        );
      });
      return itemsToReview;
    }
  }
};
