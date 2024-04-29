import { itemTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";
import { isTimeToReviewHandler } from "./isTimeToReviewHandler";

interface InitialDataType {
  name: string;
  Reviewed: number;
  Pending: number;
}

export const boxChartDataHandler = (
  data: InitialDataType[],
  category: string | null
) => {
  const { itemsData } = getAppDataHandler();
  if (category === "") {
    itemsData.forEach((item: itemTypes) => {
      if (isTimeToReviewHandler(item)) {
        data[item.reviews.box - 1].Pending += 1;
      } else {
        data[item.reviews.box - 1].Reviewed += 1;
      }
    });
  } else {
    itemsData.forEach((item: itemTypes) => {
      if (item.category === category) {
        if (isTimeToReviewHandler(item)) {
          data[item.reviews.box - 1].Pending += 1;
        } else {
          data[item.reviews.box - 1].Reviewed += 1;
        }
      }
    });
  }
  return data;
};
