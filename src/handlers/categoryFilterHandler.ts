import { ItemTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";
import { makeUrlFriendly } from "./newHandlers/makeUrlFriendly";

export const categoryFilterHandler = (categoryName: string) => {
  let { itemsData } = getAppDataHandler();
  itemsData = itemsData.filter((item: ItemTypes) => {
    return makeUrlFriendly(item.category) === makeUrlFriendly(categoryName);
  });
  return itemsData;
};
