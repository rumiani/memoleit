import { docsPageUrl } from "../general/pagesLinks";

export const getDocsUrl = (id: string, name: string) => {
  return docsPageUrl + "/" + id;
};
