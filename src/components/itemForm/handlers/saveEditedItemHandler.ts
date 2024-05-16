import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { FormValues, CategoryTypes } from "../../../types/interface";
import { makeUrlFriendly } from "../../../handlers/newHandlers/makeUrlFriendly";
import { db } from "@/src/services/db";
import notFoundError from "@/src/handlers/newHandlers/notFoundError";

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
    item = { ...item, body, title, category: categoryObject!.id };
    const savedItem = await db.items.put(item);
    console.log(savedItem);
    toast.success("The new item has been saved.");
  } catch (error) {
    console.log("Error");
  }
};
