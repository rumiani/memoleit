import { makeUrlFriendly } from "./makeUrlFriendly";

export const getCategoryUrl = (categoryId: string, categoryName: string) => {
  return "/user/box/category/" + categoryId + "/" + makeUrlFriendly(categoryName);
};
