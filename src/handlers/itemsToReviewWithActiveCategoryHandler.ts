import _ from "lodash";
import { timeToNowHandler } from "./general/timeToNowHandler";
import { db } from "../services/db";
type ReviewBoxesType = {
  [key: number]: number;
};
const reviewBoxes: ReviewBoxesType = { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 };
export const itemsToReviewWithActiveCategoryHandler = async () => {
  try {
    const categories = await db.categories
      .filter((category) => category.status === true)
      .toArray();
    const items = await db.items
      .where("box")
      .below(6)
      .and(
        (item) =>
          categories.some((category) => category.id === item.categoryId) &&
          timeToNowHandler(item.lastReview).days >= reviewBoxes[item.box],
      )
      .toArray();
    return items;
  } catch (error) {
    console.error("Error fetching items to review:", error);
    return [];
  }
};
