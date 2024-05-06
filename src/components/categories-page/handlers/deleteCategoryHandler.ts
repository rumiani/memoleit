import { saveAppDataHandler } from "@/src/handlers/saveAppDataHandler";
import { getAppDataHandler } from "../../../handlers/getAppDataHandler";
import { CategoryTypes, ItemTypes } from "../../../types/interface";
import { capitalize } from "lodash";

export default function deleteCategoryHandler(category: string) {
  let appData = getAppDataHandler();
  const { categories, itemsData } = appData;
  const foundCategory = categories.find(
    (item: CategoryTypes) => item.name.toLowerCase() === category.toLowerCase()
  );
  if (!foundCategory) {
    return false;
  } else {
    appData.categories = categories.filter(
      (item: CategoryTypes) => capitalize(item.name) !== capitalize(category)
    );
    appData.itemsData = itemsData.filter(
      (item: ItemTypes) => capitalize(item.category) !== capitalize(category)
    );
    saveAppDataHandler(appData)
    return true;
  }
}
