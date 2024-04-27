import { itemTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";

export const searchItemHandler = (
  searchTerm: string,
  boxNumber: number | undefined
) => {
    console.log(searchTerm);
    
  const { itemsData } = getAppDataHandler();
  const filteredItems = itemsData.filter((item: itemTypes) => {
    if (boxNumber) {
      return (
        item.reviews.box === boxNumber &&
        (searchInText(item.title, searchTerm) ||
          searchInText(item.title, searchTerm))
      );
    } else {
      return (
        searchInText(item.title, searchTerm) ||
        searchInText(item.title, searchTerm)
      );
    }
  });
  return filteredItems;
};

const searchInText = (text: string, searchTerm: string) => {
  return (
    text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    text.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
