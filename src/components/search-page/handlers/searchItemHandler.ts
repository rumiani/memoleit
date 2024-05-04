import { ItemTypes } from "../../../types/interface";
import { getAppDataHandler } from "../../../handlers/getAppDataHandler";

export const searchItemHandler = (
  searchTerm: string,
  boxNumber: number | undefined
) => {
    
  const { itemsData } = getAppDataHandler();
  const filteredItems = itemsData.filter((item: ItemTypes) => {
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
