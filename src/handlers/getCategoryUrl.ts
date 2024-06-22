import { makeUrlFriendly } from "./makeUrlFriendly";

export const getCategoryUrl = (categoryId: string, categoryName: string) => {
  return "/box/category/" + categoryId + "/" + makeUrlFriendly(categoryName);
};
