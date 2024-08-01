import _ from "lodash";
import { timeToNowHandler } from "./general/timeToNowHandler";
import { db } from "../services/db";
interface ReviewBoxesTypes {
  [key: number]: number;
}
const reviewBoxes: ReviewBoxesTypes = { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 };

export const categoryItemsToReviewHandler = async (categoryId: string) => {
  try {
    const categoryExists =
      (await db.categories
        .filter(
          (category) => category.status === true && category.id === categoryId,
        )
        .count()) > 0;
    if (!categoryExists) return [];

    return await db.items
      .where("box")
      .below(6)
      .filter(
        (item) =>
          categoryId === item.categoryId &&
          timeToNowHandler(item.lastReview).days >= reviewBoxes[item.box],
      )
      .toArray();
  } catch (error) {
    console.error("Error fetching category items to review:", error);
    return [];
  }
};
