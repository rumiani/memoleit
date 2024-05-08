import { makeUrlFriendly } from "./makeUrlFriendly";

export const getCategoryUrl = (categoryName: string, categoryId: string) => {
  return "/box/categories/" + categoryId + "/" + makeUrlFriendly(categoryName);
};
