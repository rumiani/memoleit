import { ItemTypes } from "../types/interface";

export const randomItemHandler = (items: ItemTypes[]) => {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
};
