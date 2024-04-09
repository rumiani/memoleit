import { categoryTypes, itemTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";
import { timeToNowHandler } from "./home/general/timeToNowHandler";

// These are the 6 boxes.Box zero means the learning proccess hasn't started yet.
const reviewBoxes = [0, 1, 3, 7, 15, 31];

export const itemsToReviewHandler = () => {
  if (typeof window !== "undefined") {
    const appData = getAppDataHandler();
    const { itemsData, categories } = appData;
    if (itemsData.length > 0) {
      const itemsToReview = itemsData.filter((item: itemTypes) => {
        const daysSinceReviewed = timeToNowHandler(
          item.reviews.lastReviewDate
        ).days;
        const newlyAddedItem = item.reviews.lastReviewDate === 0;
        const lastFailMoreThanAnHour =
          new Date().getTime() - item.reviews.lastReviewDate > 3600000;

        const category = categories.find(
          (category: categoryTypes) => category.name === item.category
        );

        // conditions
        const isInTheBox = item.reviews.box < 6;
        const isTimeToReview =
          daysSinceReviewed >= reviewBoxes[item.reviews.box];

        return (
          newlyAddedItem ||
          (lastFailMoreThanAnHour &&
            category.status &&
            isInTheBox &&
            isTimeToReview)
        );
      });
      return itemsToReview;
    }
  }
};
