import { db } from "../services/db";
import { ItemTypes } from "../types/interface";
import { isTimeToReviewHandler } from "./isTimeToReviewHandler";

export const itemsToReviewHandler = () => {
  return db.categories
    .where({ status: 1 })
    .primaryKeys()
    .then((categoryIDs) => {
      return db.items
        .filter((item) => categoryIDs.includes(item.categoryId))
        .toArray();
    })
    .then((items) => {
      return items.filter((item: ItemTypes) => isTimeToReviewHandler(item));
    })
    .catch((error) => {
      console.log("Error");
    });
};
