import { categoryPageUrl } from "../general/pagesLinks";
import { makeUrlFriendly } from "../makeUrlFriendly";

export const getItemEditUrl = (id: string, name: string) => {
  return categoryPageUrl + id + "/" + makeUrlFriendly(name);
};
