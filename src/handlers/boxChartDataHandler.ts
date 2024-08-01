import { db } from "../services/db";
import { ItemTypes } from "../types/interface";
import { categoryItemsToReviewHandler } from "./categoryItemsToReviewHandler";
import { itemsToReviewHandler } from "./itemsToReviewHandler";
import { numberOfItemsToReviewHandler } from "./numberOfItemsToReviewHandler";

interface InitialDataType {
  name: string;
  Reviewed: number;
  Pending: number;
}

export const boxChartDataHandler = async (
  data: InitialDataType[],
  id: string,
): Promise<InitialDataType[] | undefined> => {
  try {
    let items;
    let itemsToReview;
    if (id === "") {
      items = await db.items.toArray();
      itemsToReview = await itemsToReviewHandler();
    } else {
      items = await db.items.where({ categoryId: id }).toArray();
      itemsToReview = await categoryItemsToReviewHandler(id);      
    }

    if (itemsToReview && itemsToReview) {
      const itemsPending = items.filter(
        (aItem) => !itemsToReview.some((bItem) => bItem.id === aItem.id),
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
