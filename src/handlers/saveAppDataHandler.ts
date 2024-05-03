import { AppDataTypes } from "../types/interface";

export const saveAppDataHandler = (appData: AppDataTypes) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("appData", JSON.stringify(appData));
  }
};
