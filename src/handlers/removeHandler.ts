import { randomItemHandler } from "./randomItemHandler";
import { toast } from "react-toastify";
import { getAppDataHandler } from "./getAppDataHandler";
import { itemTypes } from "../types/interface";
import { initialDataStoreToLocal } from "./initialDataStoreToLocal";

export const removeHandler = (id: string) => {
  console.log(id);
  let appData = getAppDataHandler();
  appData.itemsData = appData.itemsData.filter(
    (item: itemTypes) => item.id !== id
  );
  localStorage.setItem("appData", JSON.stringify(appData));
  toast.success("The item was removed.");
  return randomItemHandler();
};
