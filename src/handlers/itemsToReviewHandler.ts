import { db } from "../services/db";
import { ItemTypes } from "../types/interface";
import { isTimeToReviewHandler } from "./isTimeToReviewHandler";

export const itemsToReviewHandler = async () => {
  try {
    const activeCategoriesIDs = await db.categories.where({ status: 1 }).primaryKeys();
    const items = await db.items
      .filter((item) => activeCategoriesIDs.includes(item.categoryId))
      .toArray();
    const itemsToReview = items.filter((item: ItemTypes) =>
      isTimeToReviewHandler(item)
    );
    return itemsToReview;
  } catch (error) {
    console.log("Rrror");
  }
};
