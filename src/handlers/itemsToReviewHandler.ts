import _ from "lodash";
import { timeToNowHandler } from "./home/general/timeToNowHandler";
import { db } from "../services/db";
type ReviewBoxesType = {
  [key: number]: number;
};
export const itemsToReviewHandler = async () => {
  try {
    const reviewBoxes: ReviewBoxesType = { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 };
    const categories = await db.categories.where({ status: 1 }).toArray();
    const items = await db.items
      .where("box")
      .below(6)
      .and(
        (item) =>
          categories.some((category) => category.id === item.categoryId) &&
          timeToNowHandler(item.lastReview).days >= reviewBoxes[item.box]
      )
      .toArray();
    return items;
  } catch (error) {
    console.log(error);
  }
};
