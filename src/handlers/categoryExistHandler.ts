import { getAppDataHandler } from "./getAppDataHandler";
import { categoryTypes } from "../types/interface";

export default function categoryExistHandler(category: string) {
  if (typeof window !== "undefined") {
    const { categories } = getAppDataHandler();
    const foundCategory = categories.find(
      (item: categoryTypes) => item.name === category
    );
    return foundCategory ? true : false;
  }
}
