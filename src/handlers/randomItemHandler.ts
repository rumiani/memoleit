import { randomElementHandler } from "./home/general/randomElementHandler";
import { toReviewHandler } from "./toReviewHandler";

export const randomItemHandler = () => {
  const toReveiwItems = toReviewHandler();
  if(toReveiwItems){
    const randomItem = randomElementHandler(toReveiwItems);
    return randomItem;
  }
};
