import { getAppDataHandler } from "./getAppDataHandler";
import { CategoryTypes } from "../types/interface";
import { makeUrlFriendly } from "./makeUrlFriendly";

export default function categoryExistHandler(category: string) {
  if (typeof window !== "undefined") {
    const { categories } = getAppDataHandler();
    const foundCategory = categories.find(
      (item: CategoryTypes) =>
        makeUrlFriendly(item.name).toLowerCase() === makeUrlFriendly(category).toLowerCase()
    );
    return foundCategory ? true : false;
  }
}
