export const makeUrlFriendly = (str: string) => {
  return str
    .replace(/[^a-zA-Z0-9-_]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-{2,}/g, "-")
    .toLowerCase();
};
