import { db } from "@/src/services/db";
import { CategoryTypes } from "@/src/types/interface";

export const getCategoriesHandler = async () => {
  try {
    const categories = await db.categories.toArray();
    const sortedCategories = categories.sort(
      (a: CategoryTypes, b: CategoryTypes) => +a.createdAt - b.createdAt,
    );
    return sortedCategories;
  } catch (error) {
    console.log("Error");
  }
};
