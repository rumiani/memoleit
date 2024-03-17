import { item } from "@/types/interface";
import { reviewHandler } from "./reviewHandler";

export const randomItemHandler = (itemsData: item[]) => {
  if (itemsData.length > 0) {
    const unlearnedItems = itemsData.filter(
      (item: item) =>
        item.learned === false && reviewHandler(item.createdAt).shouldReview
    );
    const randomIndex = Math.floor(Math.random() * unlearnedItems.length);

    const randomItem = unlearnedItems[randomIndex];
    return randomItem;
  }
};
