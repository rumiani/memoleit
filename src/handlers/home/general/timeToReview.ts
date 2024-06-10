import { ItemTypes } from "@/src/types/interface";
import { timeToNowHandler } from "./timeToNowHandler";

type ReviewBoxesType = {
  [key: number]: number;
};
export const timeToReviewHandler = (item: ItemTypes) => {
  const reviewBoxes: ReviewBoxesType = { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 };
  return timeToNowHandler(item.lastReview).days >= reviewBoxes[item.box];
};
