import { db } from "../services/db";
import { CategoryTypes, ItemTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";
import { isTimeToReviewHandler } from "./isTimeToReviewHandler";

interface InitialDataType {
  name: string;
  Reviewed: number;
  Pending: number;
}

export const boxChartDataHandler = async (data: InitialDataType[], id?: string) => {
  const itemsData = await db.items.toArray()
  const foundCategory = await db.categories.get(id)

  if (id === "") {
    itemsData.forEach((item: ItemTypes) => {
      if (isTimeToReviewHandler(item)) {
        data[item.box - 1].Pending += 1;
      } else {
        if (item.box < 6) {
          data[item.box - 1].Reviewed += 1;
        }
      }
    });
  } else {

    itemsData.forEach((item: ItemTypes) => {
      if (item.category === foundCategory?.name) {
        if (isTimeToReviewHandler(item)) {
          data[item.box - 1].Pending += 1;
        } else {
          if (item.box < 6) {
            data[item.box - 1].Reviewed += 1;
          }
        }
      }
    });
  }
  return data;
};
