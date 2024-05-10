import { db } from "../../services/db";
export const itemsCategoryIdFilterHandler = (categoryId: string) => {
  return db.items.where('categoryId').equals(categoryId).toArray()
};
