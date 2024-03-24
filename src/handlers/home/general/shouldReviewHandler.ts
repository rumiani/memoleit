import { daysToNowHandler } from "./daysToNowHandler";

export const shouldReviewHandler = (time: number) => {
  const days = daysToNowHandler(time);
  let shouldReview = days === 0 || (days & (days - 1)) === 0;
  return shouldReview;
};
