import { db } from "../services/db";
import { ItemTypes } from "../types/interface";
import { itemsToReviewHandler } from "./itemsToReviewHandler";

interface InitialDataType {
  name: string;
  Reviewed: number;
  Pending: number;
}

export const boxChartDataHandler = async (
  data: InitialDataType[],
  id?: string
) => {
  try {
    let itemsData =
      id === ""
        ? await db.items.toArray()
        : await db.items.where({ categoryId: id }).toArray();
    const itemsToReview = await itemsToReviewHandler();
    if (itemsToReview) {
      const itemsPending = itemsData.filter(
        (aItem) => !itemsToReview.some((bItem) => bItem.id === aItem.id)
      );
      itemsToReview.forEach((item: ItemTypes) => {
        data[item.box - 1].Pending += 1;
      });
      itemsPending.forEach((item: ItemTypes) => {
        if (item.box < 6) {
          data[item.box - 1].Reviewed += 1;
        }
      });
    }
    return data;
  } catch (error) {}
};
