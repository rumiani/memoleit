import { categoryTypes, itemTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";
import { isTimeToReviewHandler } from "./isTimeToReviewHandler";

export const itemsToReviewHandler = () => {
  if (typeof window !== "undefined") {
    const { itemsData, categories } = getAppDataHandler();
    if (itemsData.length > 0) {
      const itemsToReview = itemsData.filter((item: itemTypes) => {
        const category = categories.find(
          (category: categoryTypes) => category.name === item.category
        );
        return category?.status && isTimeToReviewHandler(item);
      });
      return itemsToReview;
    }
  }
};
