import { getAppDataHandler } from "./getAppDataHandler";
import { ItemTypes } from "../types/interface";
import { saveAppDataHandler } from "./saveAppDataHandler";

export const removeHandler = (id: string) => {
  let appData = getAppDataHandler();
  const itemFount = appData.itemsData.find((item: ItemTypes) => item.id === id);
  if (itemFount) {
    appData.itemsData = appData.itemsData.filter(
      (item: ItemTypes) => item.id !== id
    );
    saveAppDataHandler(appData)
    return true;
  } else {
    return false;
  }
};
