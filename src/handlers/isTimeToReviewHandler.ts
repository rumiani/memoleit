import _ from "lodash";
import { ItemTypes } from "../types/interface";
import { timeToNowHandler } from "./home/general/timeToNowHandler";

type ReviewBoxesType = {
  [key: number]: number;
};

export const isTimeToReviewHandler = (item: ItemTypes) => {
  const reviewBoxes: ReviewBoxesType = { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 };
  const daysSinceReviewed = timeToNowHandler(item.lastReview).days;
  const isTimeToReview = daysSinceReviewed >= reviewBoxes[item.box];
  const isInTheBox = item.box < 6;
  return isInTheBox && isTimeToReview;
};
