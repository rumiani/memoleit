import { isEmpty } from "lodash";
import { randomElementHandler } from "./home/general/randomElementHandler";
import { itemsToReviewHandler } from "./itemsToReviewHandler";

export const randomItemHandler = () => {
  const toReveiwItems = itemsToReviewHandler();
  if (!isEmpty(toReveiwItems)) {
    return randomElementHandler(toReveiwItems);
  } else {
    return null;
  }
};
