import { db } from "../services/db";
import { ItemTypes } from "../types/interface";
import { isTimeToReviewHandler } from "./isTimeToReviewHandler";

export const itemsToReviewHandler = () => {
  db.categories
    .where("status")
    .equals(1)
    .primaryKeys()
    .then((categoryIDs) => {
      console.log(categoryIDs);
      return db.items
        .filter((item) => categoryIDs.includes(item.categoryId))
        .toArray();
    })
    .then((items) => {
      return items.filter((item: ItemTypes) => isTimeToReviewHandler(item));
    })
    .catch(() => {
      console.log("Error");
    });
};
