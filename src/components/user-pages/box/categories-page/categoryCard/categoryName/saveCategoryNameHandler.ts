import { makeUrlFriendly } from "@/src/handlers/makeUrlFriendly";
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

    const items = await db.items
      .where("categoryId")
      .equals(categoryId)
      .toArray();

    const newCategoryNameExist = await db.categories
      .where("name")
      .equals(makeUrlFriendly(newCategoryName))
      .first();

    if (newCategoryNameExist) {
      for (let item of items) {
        item.categoryId = newCategoryNameExist.id;
        item.category = newCategoryNameExist.name;
      }
      await db.categories.delete(categoryId);
    } else {
      category.name = newCategoryName;
      for (const item of items) item.category = newCategoryName;
      await db.categories.put(category);
    }
    await db.items.bulkPut(items);
  } catch (error) {}
}
