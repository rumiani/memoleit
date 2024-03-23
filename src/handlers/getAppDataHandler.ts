import { initialDataStoreToLocal } from "./initialDataStoreToLocal";

export const getAppDataHandler = () => {
  initialDataStoreToLocal();
  const appDataJson: string | null = localStorage.getItem("appData");
  if (appDataJson) return JSON.parse(appDataJson);
};
