import { db } from "@/src/services/db";
export const getCategoriesHandler = async () => {
  try {
    return await db.categories
      .toArray()
      .then((categories) =>
        categories.sort((a, b) => a.createdAt - b.createdAt),
      );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
