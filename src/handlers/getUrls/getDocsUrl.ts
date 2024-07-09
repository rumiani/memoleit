import { docsPageUrl } from "../../data/links/pagesLinks";
import { makeUrlFriendly } from "../makeUrlFriendly";

export const getDocsUrl = (id: string, name: string) => {
  return docsPageUrl + "/" + id;
};
