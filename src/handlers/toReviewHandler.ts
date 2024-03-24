import { itemTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";
import { shouldReviewHandler } from "./home/general/shouldReviewHandler";

export const toReviewHandler = () => {
  let { itemsData, catagories } = getAppDataHandler();
  if (itemsData.length > 0) {
    const toReveiwItems = itemsData.filter(
      (item: itemTypes) =>
        item.learned === false &&
        catagories[item.catagory] &&
        shouldReviewHandler(item.startedAt)
    );
    return toReveiwItems;
  }
};
