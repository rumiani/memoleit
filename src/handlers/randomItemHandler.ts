import { itemTypes } from "@/src/types/interface";
import { reviewHandler } from "./reviewHandler";

export const randomItemHandler = (itemsData: itemTypes[]) => {
  if (itemsData.length > 0) {
    const unlearnedItems = itemsData.filter(
      (item: itemTypes) =>
        item.learned === false && reviewHandler(item.createdAt).shouldReview
    );
    const randomIndex = Math.floor(Math.random() * unlearnedItems.length);

    const randomItem = unlearnedItems[randomIndex];
    return randomItem;
  }
};
