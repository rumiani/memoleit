import { isEmpty } from "lodash";
import { itemsToReviewHandler } from "./itemsToReviewHandler";

export const randomItemHandler = () => {
  const toReveiwItems = itemsToReviewHandler();
  if (!isEmpty(toReveiwItems)) {
    const randomIndex = Math.floor(Math.random() * toReveiwItems.length);
    return toReveiwItems[randomIndex];
  }
};
