import { randomItemHandler } from "./randomItemHandler";
import { itemTypes } from "@/src/types/interface";
import { getAppDataHandler } from "./getAppDataHandler";
import { daysToNowHandler } from "./home/general/daysToNowHandler";

export function learnedHandler(currentItem: itemTypes | undefined, status: boolean) {
  const items = getAppDataHandler();
  const foundItem = items.find((item) => item.id === currentItem?.id);
  const days = daysToNowHandler(foundItem!.startedAt)
  if (foundItem && !status) {
    foundItem.createdAt = Date.now();
  }
  if (foundItem && days > 31) {
    foundItem.learned = true;
  }
  localStorage.setItem("itemsData", JSON.stringify(items));

  return randomItemHandler();
}
