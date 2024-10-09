import _ from "lodash";
import { db } from "../services/db";
import { timeToReviewHandler } from "./general/timeToReview";

export const itemsToReviewHandler = async () => {
  try {
    return await db.items
      .where("box")
      .below(6)
      .and((item) => timeToReviewHandler(item))
      .toArray();
  } catch (error) {}
};
