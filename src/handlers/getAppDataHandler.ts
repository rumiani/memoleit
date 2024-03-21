import { itemTypes } from "../types/interface";

export const getAppDataHandler = () => {
  const appDataJson: string | null = localStorage.getItem("appData");
  let appData;
  let itemsData: itemTypes[] = [];
  appData = JSON.parse(appDataJson);
    
  return appData;
};
