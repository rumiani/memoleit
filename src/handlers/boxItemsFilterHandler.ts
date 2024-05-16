import { db } from "../services/db";
import { ItemTypes } from "../types/interface";
export const boxItemsFilterHandler = async (
  categoryId: string,
  boxNumber?: number
) => {
  try {
    const items = await db.items
      .where("categoryId")
      .equals(categoryId)
      .toArray();
    const filteredItems = items.filter((item: ItemTypes) => {
      return boxNumber ? items && item.box === boxNumber : items;
    });
    return filteredItems;
  } catch (error) {}
};
