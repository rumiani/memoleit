import { db } from "../services/db";
import notFoundError from "./newHandlers/notFoundError";

export const removeHandler = async (id: string) => {
  try {
    const foundItem = await db.items.get(id);
    if (!foundItem) throw notFoundError("404");
    await db.items.delete(id);
  } catch (error) {
    console.log("Error");
  }
};
