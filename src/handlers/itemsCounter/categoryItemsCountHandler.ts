import { ItemTypes } from "@/src/types/interface";
import itemsCountHandler from "./itemsCountHandler";
import { db } from "@/src/services/db";

export const categoryItemsCountHandler = async (categoryId?: string) => {
  try {    
    let items: ItemTypes[];
    if (categoryId === "") {
      items = await db.items.toArray();
    } else {
      items = await db.items.where({ categoryId }).toArray();
    }
    console.log(categoryId,items);
    
    return itemsCountHandler(items);
  } catch (error) {
    console.log("Error");
  }
};
