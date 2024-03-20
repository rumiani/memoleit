import { v4 as uuidv4 } from "uuid";
import { itemTypes } from "../types/interface";

export const storeToLocal = (items?: string[]) => {
  const localStorageData: string | null = localStorage.getItem("itemsData");
  let itemsData: itemTypes[] = [];
  if (localStorageData) {
    itemsData = JSON.parse(localStorageData) as itemTypes[];
  } else {
    items?.forEach((item, i) => {
      itemsData!.push({
        id: uuidv4(),
        title: item,
        body: "",
        catagory: "",
        createdAt: Date.now(),
        learned: false,
        days: 0,
        shouldReview: false,
        length: 0,
        tags: [],
      });
    });
    localStorage.setItem("itemsData", JSON.stringify(itemsData));
  }
  return itemsData;
};
