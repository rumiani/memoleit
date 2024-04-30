export const makeUrlFriendly = (str: string) => {
  if (str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");
  } else {
    return false;
  }
};
