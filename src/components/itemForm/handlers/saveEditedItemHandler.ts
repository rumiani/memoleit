import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { FormValues, CategoryTypes } from "../../../types/interface";
import { makeUrlFriendly } from "../../../handlers/newHandlers/makeUrlFriendly";
import { db } from "@/src/services/db";
import notFoundError from "@/src/handlers/newHandlers/notFoundError";
import { randomIdGenerator } from "@/src/handlers/newHandlers/randomID";
import { userIdTest } from "@/src/services/userId";

export const saveEditedItemHandler = async (
  { title, body, category }: FormValues,
  id: string
) => {
  try {
    let item = await db.items.get(id);
    if (!item) throw notFoundError("404");
    const categoryObject = await db.categories
      .where("name")
      .equals(category)
      .first();
    if (!categoryObject) {
      const createNewCategory = await db.categories.add({
        id: randomIdGenerator(8),
        userId: userIdTest,
        name: makeUrlFriendly(category),
        status: 1,
        createdAt: Date.now(),
      });
      item = { ...item, body, title, category, categoryId: createNewCategory };
      await db.items.put(item);
    } else {
      item = { ...item, body, title, category: categoryObject!.id };
      await db.items.put(item);
    }
    toast.success("The new item has been saved.");
  } catch (error) {
    console.log("Error");
  }
};
