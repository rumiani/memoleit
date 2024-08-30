const appPages = {
  isNewPage: (path: string) => path.split("/")[3] === "new",
  isEditPage: (path: string) => path.split("/")[3] === "edit",
  isDocsPage: (path: string) => path.split("/")[3] === "docs",
  isReviewPage: (path: string) => path.split("/")[3] === "review",
  isCategoryPage: (path: string) => path.split("/")[3] === "category",
  isItemPage: (path: string) => path.split("/")[3] === "item",
  isSearchPage: (path: string) => path.split("/")[3] === "search",
  isUserRoute: (path: string) => path.split("/")[1] === "user",
};
export default appPages;
