import { itemTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";

export const catagoryFilterHandler = (topic: string) => {
    const { itemsData } = getAppDataHandler();
    itemsData.filter(
        (item: itemTypes) =>
          item.catagory.toUpperCase() === topic.toUpperCase()
      );
      return itemsData;
};
