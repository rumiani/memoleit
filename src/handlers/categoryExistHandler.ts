import { getAppDataHandler } from "./getAppDataHandler";
import { categoryTypes } from "../types/interface";
import { makeUrlFriendly } from "./makeUrlFriendly";

export default function categoryExistHandler(category: string) {
  if (typeof window !== "undefined") {
    const { categories } = getAppDataHandler();
    const foundCategory = categories.find(
      (item: categoryTypes) =>
        makeUrlFriendly(item.name).toLowerCase() === makeUrlFriendly(category).toLowerCase()
    );
    return foundCategory ? true : false;
  }
}
