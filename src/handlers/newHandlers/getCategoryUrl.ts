export const getCategoryUrl = ({categoryName, categoryId}:{categoryName:string,categoryId:string}) => {
  return "/box/categories/" + categoryId + "/" + categoryName;
};
