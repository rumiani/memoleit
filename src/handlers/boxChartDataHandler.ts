import { CategoryTypes, ItemTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";
import { isTimeToReviewHandler } from "./isTimeToReviewHandler";

interface InitialDataType {
  name: string;
  Reviewed: number;
  Pending: number;
}

export const boxChartDataHandler = (data: InitialDataType[], id?: string) => {
  const { itemsData, categories } = getAppDataHandler();
  if (id === "") {
    itemsData.forEach((item: ItemTypes) => {
      if (isTimeToReviewHandler(item)) {
        data[item.reviews.box - 1].Pending += 1;
      } else {
        if (item.reviews.box < 6) {
          data[item.reviews.box - 1].Reviewed += 1;
        }
      }
    });
  } else {
    const foundCategory = categories.find((category: CategoryTypes) => {
      return category.id === id;
    });

    itemsData.forEach((item: ItemTypes) => {
      console.log(item.category === foundCategory.name);
      if (item.category === foundCategory.name) {
        if (isTimeToReviewHandler(item)) {
          data[item.reviews.box - 1].Pending += 1;
        } else {
          if (item.reviews.box < 6) {

            data[item.reviews.box - 1].Reviewed += 1;
          }
        }
      }
    });
  }
  return data;
};
