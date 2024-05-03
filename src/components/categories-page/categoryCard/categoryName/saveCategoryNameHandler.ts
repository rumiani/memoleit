import { saveAppDataHandler } from "@/src/handlers/saveAppDataHandler";
import { getAppDataHandler } from "../../../../handlers/getAppDataHandler";
import { CategoryTypes, ItemTypes } from "../../../../types/interface";

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
    (item: CategoryTypes) => item.id === id
  );

  if (!foundCategory) {
    return false;
  } else {
    itemsData.forEach((item: ItemTypes) => {
      if (item.category === foundCategory.name) {
        item.category = categoryValue;
      }
    });
    foundCategory.name = categoryValue;
    saveAppDataHandler(appData)
    return true;
  }
}
