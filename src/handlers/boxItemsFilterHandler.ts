import { ItemTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";
import { makeUrlFriendly } from "./newHandlers/makeUrlFriendly";

export const boxItemsFilterHandler = (
  categoryName: string,
  boxNumber?: number
) => {
  let { itemsData } = getAppDataHandler();
  itemsData = itemsData.filter((item: ItemTypes) => {
    const isInCategory =
      makeUrlFriendly(item.category) === makeUrlFriendly(categoryName);
    const isInTheBox = item.reviews.box === boxNumber;
    if (boxNumber) {
      return isInCategory && isInTheBox;
    } else {
      return isInCategory;
    }
  });
  return itemsData;
};
