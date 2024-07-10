import _ from "lodash";
import { db } from "../services/db";
import { timeToReviewHandler } from "./home/general/timeToReview";

export const itemsToReviewHandler = async () => {
  try {
    const items = await db.items
      .where("box")
      .below(6)
      .and((item) => timeToReviewHandler(item))
      .toArray();
    return items;
  } catch (error) {
    console.log("Error");
  }
};
