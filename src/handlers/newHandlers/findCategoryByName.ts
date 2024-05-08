import { db } from "@/src/services/db";

export const findCategoryByName = (categoryName: string) => {
  return db.categories.where("name").equals(categoryName).first();
};
