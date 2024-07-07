import { editPageUrl } from "../../data/links/pagesLinks";
import { makeUrlFriendly } from "../makeUrlFriendly";

export const getItemUrl = (id: string, name: string) => {
  return editPageUrl + id + "/" + makeUrlFriendly(name);
};
