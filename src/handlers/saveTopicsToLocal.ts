import { toast } from "react-toastify";
import { getAppDataHandler } from "./getAppDataHandler";
import { catagoryTypes } from "../types/interface";

export const saveTopicsToLocal = (newCatagories: catagoryTypes[]) => {
  const appData = getAppDataHandler();
  appData.catagories = [...newCatagories];
  localStorage.setItem("appData", JSON.stringify(appData));
  toast.success("New filters have been saved.");
};
