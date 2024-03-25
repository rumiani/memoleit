import { randomItemHandler } from "./randomItemHandler";
import { itemTypes } from "@/src/types/interface";
import { getAppDataHandler } from "./getAppDataHandler";

export function reviewHandler(
  currentItem: itemTypes | undefined,
  status: boolean
) {
  const { itemsData } = getAppDataHandler();
  const foundItem = itemsData.find(
    (item: itemTypes) => item.id === currentItem?.id
  );
  if (foundItem) {
    foundItem.reviews.startedAt = Date.now();
    status ? (foundItem.reviews.box += 1) : (foundItem.reviews.box = 1);

    localStorage.setItem("itemsData", JSON.stringify(itemsData));

    return randomItemHandler();
  }
}
