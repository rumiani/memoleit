import { editPageUrl } from "../general/pagesLinks";
import { makeUrlFriendly } from "../makeUrlFriendly";

export const getItemUrl = (id: string, name: string) => {
  return editPageUrl + id + "/" + makeUrlFriendly(name);
};
