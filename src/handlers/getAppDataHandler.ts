import { initialDataStoreToLocal } from "./initialDataStoreToLocal";

export const getAppDataHandler = () => {
  if (typeof window !== "undefined") {
    initialDataStoreToLocal();
    const appDataJson: string  = localStorage.getItem("appData")!;
    return JSON.parse(appDataJson);
  }
};
