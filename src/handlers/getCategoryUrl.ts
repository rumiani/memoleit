import { CategoryTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";
import { makeUrlFriendly } from "./makeUrlFriendly";

export const getCategoryUrl = (categoryName: string) => {
  const { categories } = getAppDataHandler();
  const foundCategory = categories.find(
    (category: CategoryTypes) => category.name === categoryName
  );
  const categoryUrl = "/box/categories/" +
  foundCategory.id.substring(0, 8) +
  "/" +
  makeUrlFriendly(categoryName)
  console.log(categoryUrl);
  
  return categoryUrl;
};
