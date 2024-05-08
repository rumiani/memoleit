import { db } from "@/src/services/db";

export const getCategoriesHandler = () => {
  return db.categories.toArray();
};
