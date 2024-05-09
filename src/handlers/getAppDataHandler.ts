import { appDataInitialiser } from "./newHandlers/appDataInitialiser";

export const getAppDataHandler = () => {
  if (typeof window !== "undefined") {
    appDataInitialiser();
    const appDataJson: string | null = localStorage.getItem("appData");
    if (appDataJson) return JSON.parse(appDataJson);
  }
};
