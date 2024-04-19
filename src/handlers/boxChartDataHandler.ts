import { itemTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";
import { timeToNowHandler } from "./home/general/timeToNowHandler";
type ReviewBoxesType = {
  [key: number]: number;
};

interface InitialDataType {
  name: string;
  Reviewed: number;
  Pending: number;
}

export const barChartDataHandler = (
  data: InitialDataType[],
  category: string | null
) => {
  const { itemsData } = getAppDataHandler();
  if (category === "") {
    itemsData.forEach((item: itemTypes) => dataModifier(data, item));
  } else {
    itemsData.forEach((item: itemTypes) => {
      if (item.category === category) dataModifier(data, item);
    });
  }
  return data;
};

const dataModifier = (data: InitialDataType[], item: itemTypes) => {
  const reviewBoxes: ReviewBoxesType = { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 };
  const daysSinceReviewed = timeToNowHandler(item.reviews.lastReviewDate).days;
  const isTimeToReview = daysSinceReviewed >= reviewBoxes[item.reviews.box];
  
  if (isTimeToReview) {
    data[item.reviews.box - 1].Pending += 1;
  } else {
    data[item.reviews.box - 1].Reviewed += 1;
  }
};
