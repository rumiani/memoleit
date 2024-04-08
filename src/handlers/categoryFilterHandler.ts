import { itemTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";

export const categoryFilterHandler = (topic: string) => {
    let { itemsData } = getAppDataHandler();    
    itemsData =itemsData.filter(
        (item: itemTypes) =>
          item.category.toUpperCase() === topic.toUpperCase()
      );
      return itemsData;
};
