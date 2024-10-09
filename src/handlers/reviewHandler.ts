import { ItemTypes } from "@/src/types/interface";
import { db } from "../services/db";
import { v4 as uuidv4 } from "uuid";
import { userIdTest } from "../services/userId";
import notFoundError from "./notFoundError";

export async function reviewHandler(
  currentItem: ItemTypes | undefined,
  answer: boolean,
) {
  try {
    const foundItem = await db.items.get(currentItem?.id);
    if (!foundItem) throw notFoundError("404");

    await db.items.put({
      ...foundItem,
      lastReview: Date.now(),
      box: answer ? foundItem.box + 1 : 1,
    });

    await db.reviews.add({
      id: uuidv4(),
      userId: userIdTest,
      itemId: foundItem.id,
      answer: answer ? 1 : 0,
      createdAt: Date.now(),
    });
  } catch (error) {}
}
