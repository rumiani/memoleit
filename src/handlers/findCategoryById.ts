import { db } from "@/src/services/db";

export const findCategoryById = (categoryId: string) => {
  return db.categories.get(categoryId);
};
