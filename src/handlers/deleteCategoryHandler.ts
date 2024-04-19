import { getAppDataHandler } from "./getAppDataHandler";
import { categoryTypes, itemTypes } from "../types/interface";
import { capitalize } from "lodash";
import { toast } from "react-toastify";

export default function deleteCategoryHandler(category: string) {
  let appData = getAppDataHandler();
  const { categories, itemsData } = appData;
  const foundCategory = categories.find(
    (item: categoryTypes) => item.name.toLowerCase() === category.toLowerCase()
  );
  if (!foundCategory) {
    toast.error("Item was not found");
  } else {
    appData.categories = categories.filter(
      (item: categoryTypes) => capitalize(item.name) !== capitalize(category)
    );
    appData.itemsData = itemsData.filter(
      (item: itemTypes) => capitalize(item.category) !== capitalize(category)
    );
    localStorage.setItem("appData", JSON.stringify(appData));
    toast.success(category + "category was successfully deleted.", {
      autoClose: 2000,
    });
    return appData.categories
  }
}
