import { toast } from "react-toastify";
import { db } from "@/src/services/db";
import notFoundError from "@/src/handlers/notFoundError";
import { randomIdGenerator } from "@/src/handlers/randomID";
import { userIdTest } from "@/src/services/userId";
import { FormValues } from "@/src/types/interface";
import { makeUrlFriendly } from "@/src/handlers/makeUrlFriendly";

export const saveEditedItemHandler = async (
  { title, body, category }: FormValues,
  id: string,
) => {
  try {
    let item = await db.items.get(id);
    if (!item) throw notFoundError("404");

    const categoryObject = await db.categories.where("name").equals(makeUrlFriendly(category)).first();
    if (!categoryObject) {
      const categoryId = await db.categories.add({
        id: randomIdGenerator(8),
        userId: userIdTest,
        name: makeUrlFriendly(category),
        status: true,
        createdAt: Date.now(),
      });
      
      item = { ...item, body, title, category, categoryId };
      await db.items.put(item);
    } else {
      item = { ...item, body, title };
      await db.items.put(item);
    }
    toast.success("The Item has been updated.");

  } catch (error: any) {
    if (error.name === "404") {
      toast.error("Item was not found");
    } else {
      console.error("Error", error);
      toast.error("An error occurred while updating the item.");
    }
  }
};
