import { isEmpty } from "lodash";
import { ItemTypes } from "../types/interface";

export const randomItemHandler = (items: ItemTypes[]) => {
  const oldItems = items.filter((item) => item.box > 1);
  const itemsToChooseFrom = isEmpty(oldItems) ? items : oldItems;
  const randomIndex = Math.floor(Math.random() * itemsToChooseFrom.length);
  return itemsToChooseFrom[randomIndex];
};
