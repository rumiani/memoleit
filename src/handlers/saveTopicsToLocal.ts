import { toast } from "react-toastify";
import { getAppDataHandler } from "./getAppDataHandler";
import { categoryTypes } from "../types/interface";

export const saveTopicsToLocal = (newCategories: categoryTypes[]) => {
  const appData = getAppDataHandler();
  appData.categories = [...newCategories];
  localStorage.setItem("appData", JSON.stringify(appData));
  toast.success("New filters have been saved.");
};
