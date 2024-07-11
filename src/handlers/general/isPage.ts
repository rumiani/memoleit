const isNewPage = (path: string) => {
  return path.split("/")[3] !== "new";
};
const isEditPage = (path: string) => {
  return path.split("/")[3] !== "edit";
};
const isDocsPage = (path: string) => {
  return path.split("/")[3] !== "docs";
};
const isReviewPage = (path: string) => {
  return path.split("/")[3] !== "review";
};
const isCategoryPage = (path: string) => {
  return path.split("/")[3] !== "category";
};
const isItemPage = (path: string) => {
  return path.split("/")[3] !== "item";
};
const isUserRoute = (path: string) => {
  return path.split("/")[1] === "user";
};
export {
  isNewPage,
  isEditPage,
  isDocsPage,
  isReviewPage,
  isCategoryPage,
  isItemPage,
  isUserRoute
};
