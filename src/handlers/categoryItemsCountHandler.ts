import { itemTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";
import { makeUrlFriendly } from "./makeUrlFriendly";

export const categoryItemsCountHandler = (category: string) => {
  if (typeof window !== "undefined") {
    const allItems = getAppDataHandler().itemsData;
    const categoryItems: itemTypes[] = allItems.filter((item: itemTypes) => {
      return (
        makeUrlFriendly(item.category).toLowerCase() ===
        makeUrlFriendly(category).toLowerCase()
      );
    });

    let allItemsCount: number;
    let learnedCount: number;
    let unLearnedCount: number;

    if (category === "") {
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
