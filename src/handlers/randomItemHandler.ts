import { ItemTypes } from "../types/interface";

export const randomItemHandler = (items: ItemTypes[]) => {
  const itemsToChooseFrom = items.filter((item) => item.box > 1) || items
  const randomIndex = Math.floor(Math.random() * itemsToChooseFrom.length);
  return itemsToChooseFrom[randomIndex];
};
