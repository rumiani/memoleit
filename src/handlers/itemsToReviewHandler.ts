import { itemTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";
import { daysToNowHandler } from "./home/general/daysToNowHandler";

const boxes = [1, 3, 7, 15, 31];

export const itemsToReviewHandler = () => {
  if (typeof window !== "undefined") {
    let { itemsData, catagories } = getAppDataHandler();
    if (itemsData.length > 0) {
      const testItems = itemsData.filter(item =>
        boxes[item.reviews
          .box - 1] <=
            daysToNowHandler(item.reviews.startedAt))
      console.log(itemsData,testItems);
      
      const toReveiwItems = itemsData.filter(
        (item: itemTypes) =>
          item.reviews.box <= 5 &&
          catagories[item.catagory] &&
          boxes[item.reviews.box - 1] <=
            daysToNowHandler(item.reviews.startedAt)
      );
      return toReveiwItems;
    }
  }
};
