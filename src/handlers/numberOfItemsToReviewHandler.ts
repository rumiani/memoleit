import _ from "lodash";
import { db } from "../services/db";
import { timeToReviewHandler } from "./general/timeToReview";

export const numberOfItemsToReviewHandler = async () => {
  try {
    const count = await db.items
      .where("box")
      .below(6)
      .and((item) => timeToReviewHandler(item))
      .count();
    return count;
  } catch (error) {
    console.log("Error");
  }
};
