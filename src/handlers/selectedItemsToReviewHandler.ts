import { db } from "../services/db";
import { itemsToReviewHandler } from "./itemsToReviewHandler";

export const selectedItemsToReviewHandler = async () => {
  try {
    const activeCategoriesIDs = await db.categories
      .where({ status: 1 })
      .primaryKeys();
    const items = await db.items
      .filter((item) => activeCategoriesIDs.includes(item.categoryId))
      .toArray();
    return itemsToReviewHandler(items);
  } catch (error) {
    console.log("Rrror");
  }
};
