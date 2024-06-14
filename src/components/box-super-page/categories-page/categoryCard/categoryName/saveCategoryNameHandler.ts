import notFoundError from "@/src/handlers/notFoundError";
import { db } from "@/src/services/db";

export default async function saveCategoryNameHandler({
  categoryId,
  newCategoryName,
}: {
  categoryId: string;
  newCategoryName: string;
}) {
  try {
    const category = await db.categories.get(categoryId);
    if (!category) throw notFoundError("404");
    category.name = newCategoryName;
    await db.categories.put(category);
    const items = await db.items
      .where("categoryId")
      .equals(categoryId)
      .toArray();
    for (const item of items) item.category = newCategoryName;
    await db.items.bulkPut(items);
  } catch (error) {
    console.log("Error");
  }
}
