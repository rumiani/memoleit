import { ItemTypes } from "../../../types/interface";
import { db } from "@/src/services/db";

export const searchItemHandler = async (
  searchTerm: string,
  boxNumber: number | undefined
) => {
  try {
    let rerultItems: ItemTypes[];
    if (boxNumber) {
      rerultItems = await db.items
        .filter(
          (item) =>
            item.box === boxNumber &&
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .toArray();
    } else {
      rerultItems = await db.items
        .filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .toArray();
    }
    return rerultItems;
  } catch (error) {
    console.log("Error");
  }
};
