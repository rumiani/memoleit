import { ItemTypes } from "@/src/types/interface";
import { db } from "../services/db";
import { v4 as uuidv4 } from "uuid";
import { userIdTest } from "../services/userId";
import notFoundError from "./newHandlers/notFoundError";

export async function reviewHandler(
  currentItem: ItemTypes | undefined,
  answer: number
) {
  try {
    const foundItem = await db.items.get(currentItem?.id);
    if (!foundItem) throw notFoundError("404");

    const newReview = {
      id: uuidv4(),
      userId: userIdTest,
      itemId: foundItem.id,
      answer,
      createdAt: Date.now(),
    };
    await db.reviews.add(newReview);
    foundItem.lastReview = Date.now();
    foundItem.box += answer;
    await db.items.put(foundItem);
    return answer ? true : false;
  } catch (error) {
    console.log("Error");
  }
}
