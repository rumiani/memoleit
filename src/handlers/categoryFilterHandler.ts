import { capitalize } from "lodash";
import { itemTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";

export const categoryFilterHandler = (topic: string) => {
    let { itemsData } = getAppDataHandler();    
    itemsData =itemsData.filter(
        (item: itemTypes) =>
          capitalize(item.category) === capitalize(topic)
      );
      return itemsData;
};
