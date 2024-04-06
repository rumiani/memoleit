import { itemTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";

export const categoryFilterHandler = (topic: string) => {
    const { itemsData } = getAppDataHandler();
    itemsData.filter(
        (item: itemTypes) =>
          item.category.toUpperCase() === topic.toUpperCase()
      );
      return itemsData;
};
