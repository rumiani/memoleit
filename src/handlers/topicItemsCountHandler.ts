import { itemTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";

export const topicItemsCountHandler = (topic: string) => {
  const { itemsData } = getAppDataHandler();
  const all:itemTypes[] = itemsData.filter((item: itemTypes) => item.catagory === topic);
  const learned:itemTypes[] = all.filter((item: itemTypes) => item.learned);
  const unLearned: number = all.length - learned.length;
  console.log(unLearned);
  
  return { all:all.length, learned:learned.length, unLearned };
};
