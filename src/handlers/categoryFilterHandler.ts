import { capitalize } from "lodash";
import { itemTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";
import { makeUrlFriendly } from "./makeUrlFriendly";

export const categoryFilterHandler = (category: string) => {
    let { itemsData } = getAppDataHandler();    
    itemsData =itemsData.filter(
        (item: itemTypes) =>{
console.log(category);

         return   capitalize(makeUrlFriendly(item.category)) === capitalize(makeUrlFriendly(category))
        }
      );
      return itemsData;
};
