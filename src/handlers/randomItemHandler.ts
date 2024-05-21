import { isEmpty } from "lodash";
import { ItemTypes } from "../types/interface";

export const randomItemHandler = (items: ItemTypes[]) => {
  const importantItems = items.filter((item) => item.box > 1);
  const itemsTochooseFrom = isEmpty(importantItems) ? items : importantItems;
  const randomIndex = Math.floor(Math.random() * itemsTochooseFrom.length);
  return itemsTochooseFrom[randomIndex];
};
