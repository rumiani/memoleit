import { ItemTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";
import { timeToNowHandler } from "./home/general/timeToNowHandler";
type ReviewBoxesType = {
  [key: number]: number;
};
const reviewBoxes: ReviewBoxesType = { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 };

export const closestItemToReview = () => {
  if (typeof window !== "undefined") {
    const { itemsData, categories } = getAppDataHandler();
    let timeToReview: number;
    if (itemsData.length > 0) {
      itemsData.forEach((item: ItemTypes, i: number) => {
        const daysSinceReviewed = timeToNowHandler(
          item.reviews.lastReviewDate
        ).days;
        const isInTheBox = item.reviews.box < 6;
        const notTimeToReview =
          daysSinceReviewed < reviewBoxes[item.reviews.box];
        if (
          !timeToReview ||
          (isInTheBox &&
            notTimeToReview &&
            timeToReview < item.reviews.lastReviewDate)
        )
          timeToReview = item.reviews.lastReviewDate;
      });
    }
    return timeToReview!;
  }
};
