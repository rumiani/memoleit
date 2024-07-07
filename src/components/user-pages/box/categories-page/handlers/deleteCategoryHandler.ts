import { db } from "@/src/services/db";
import notFoundError from "@/src/handlers/notFoundError";

export default async function deleteCategoryHandler(categoryId: string) {
  try {
    const category = await db.categories.get(categoryId);
    if (!category) throw notFoundError("404");
    await db.categories.delete(categoryId);
    const itemsToDelete = await db.items
      .where("categoryId")
      .equals(categoryId)
      .toArray();
    for (const item of itemsToDelete) await db.items.delete(item.id);
    const categories = await db.categories
      .where("id")
      .notEqual(categoryId)
      .toArray();
    return categories;
  } catch (error) {}
}
