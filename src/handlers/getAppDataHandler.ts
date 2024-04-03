import { initialDataStoreToLocal } from "./initialDataStoreToLocal";

export const getAppDataHandler = () => {
  if (typeof window !== "undefined") {
    initialDataStoreToLocal();
    const appDataJson: string | null = localStorage.getItem("appData");
    if (appDataJson) return JSON.parse(appDataJson);
  }
};
