import { db } from "../../../services/db";
import itemsCountHandler from "./itemsCountHandler";

export const categoryItemsCountHandler = (categoryId: string) => {
  return db.items
    .where("categoryId")
    .equals(categoryId)
    .toArray()
    .then((items) => {
      return itemsCountHandler(items);
    })
    .catch(() => {
      console.log(Error);
    });
};
