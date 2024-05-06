import { toast } from "react-toastify";
import { getAppDataHandler } from "./getAppDataHandler";
import { CategoryTypes } from "../types/interface";
import { saveAppDataHandler } from "./saveAppDataHandler";

export const saveTopicsToLocal = (newCategories: CategoryTypes[]) => {
  const appData = getAppDataHandler();
  appData.categories = [...newCategories];
  saveAppDataHandler(appData)
  toast.success("New filters have been saved.");
};
