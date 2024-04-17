import { itemTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";

export const categoryItemsCountHandler = (topic: string) => {
  if (typeof window !== "undefined") {
    const allItems = getAppDataHandler().itemsData;
    const categoryItems: itemTypes[] = allItems.filter(
      (item: itemTypes) => item.category === topic
    );

    let allItemsCount: number;
    let learnedCount: number;
    let unLearnedCount: number;

    if (topic === "") {
      const allLearnedItems = allItems.filter(
        (item: itemTypes) => item.reviews.box > 5
      );
      allItemsCount = allItems.length;
      learnedCount = allLearnedItems.length;
      unLearnedCount = allItemsCount - learnedCount;
    } else {
      const categoryLearnedItems = categoryItems.filter(
        (item: itemTypes) => item.reviews.box > 5
      );
      allItemsCount = categoryItems.length;
      learnedCount = categoryLearnedItems.length;
      unLearnedCount = allItemsCount - learnedCount;
    }
    return { allItemsCount, learnedCount, unLearnedCount };
  }
};
