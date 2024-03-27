import { randomElementHandler } from "./home/general/randomElementHandler";
import { itemsToReviewHandler } from "./itemsToReviewHandler";

export const randomItemHandler = () => {
  const toReveiwItems = itemsToReviewHandler();
  // console.log(toReveiwItems);
  if (toReveiwItems) {
    const randomItem = randomElementHandler(toReveiwItems);
    
    return randomItem;
  }
};
