export const makeUrlFriendly = (str: string) => {
  return  str
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9\s-]+/g, "") 
  .replace(/\s+/g, "-")           
  .replace(/-+/g, "-");   
};
