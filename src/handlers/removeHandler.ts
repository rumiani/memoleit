import { getAppDataHandler } from "./getAppDataHandler";
import { ItemTypes } from "../types/interface";

export const removeHandler = (id: string) => {
  let appData = getAppDataHandler();
  const itemFount = appData.itemsData.find((item: ItemTypes) => item.id === id);
  if (itemFount) {
    appData.itemsData = appData.itemsData.filter(
      (item: ItemTypes) => item.id !== id
    );
    localStorage.setItem("appData", JSON.stringify(appData));
    return true;
  } else {
    return false;
  }
};
