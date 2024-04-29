import { itemTypes } from "../types/interface";
import { timeToNowHandler } from "./home/general/timeToNowHandler";

type ReviewBoxesType = {
  [key: number]: number;
};

export const isTimeToReviewHandler = (item: itemTypes) => {
  const reviewBoxes: ReviewBoxesType = { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 };
  const daysSinceReviewed = timeToNowHandler(item.reviews.lastReviewDate).days;
  const isInTheBox = item.reviews.box < 6;
  const isTimeToReview = daysSinceReviewed >= reviewBoxes[item.reviews.box];
  return isInTheBox && isTimeToReview;
};
