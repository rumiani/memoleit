import { getAppDataHandler } from "./getAppDataHandler";
import { categoryTypes, itemTypes } from "../types/interface";
import { capitalize } from "lodash";
import { toast } from "react-toastify";

export default function saveCategoryNameHandler({
  id,
  categoryValue,
}: {
  id: string;
  categoryValue: string;
}) {
  let appData = getAppDataHandler();
  const { categories, itemsData } = appData;
  const foundCategory = categories.find(
    (item: categoryTypes) => item.id === id
  );

  if (!foundCategory) {
    return false;
  } else {
    itemsData.forEach((item: itemTypes) => {
      if (item.category === foundCategory.name) {
        item.category = categoryValue;
      }
    });
    foundCategory.name = categoryValue;
    localStorage.setItem("appData", JSON.stringify(appData));
    return true;
  }
}
