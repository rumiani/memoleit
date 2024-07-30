import _ from "lodash";
import { db } from "../services/db";
import { timeToReviewHandler } from "./general/timeToReview";

export const numberOfItemsToReviewHandler = async () => {
  try {
    return await db.items
      .where("box")
      .below(6)
      .and((item) => timeToReviewHandler(item))
      .count();
  } catch (error) {
    console.error("Error counting items to review:", error);
    return 0;
  }
};
