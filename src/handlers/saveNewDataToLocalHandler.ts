"use client";
import { categoryTypes, itemTypes } from "../types/interface";

export const saveNewDataToLocalHandler = (newAppData: any) => {
  if (typeof window !== "undefined") {
    const appDataJson: string | null = localStorage.getItem("appData");

    if (appDataJson) {
      let appData = JSON.parse(appDataJson);
      const appDataKeys = Object.keys(appData).sort();
      const newAppDataKeys = Object.keys(newAppData).sort();
      const objectsHaveSimilarKeys =
        JSON.stringify(appDataKeys) === JSON.stringify(newAppDataKeys);
      if (objectsHaveSimilarKeys) {
        newAppData.categories.forEach((newCategory: categoryTypes) => {
          const categoryExists = appData.categories.find(
            (category: categoryTypes) => {
              category.name === newCategory.name;
            }
          );
          if (!categoryExists) {
            appData.categories.push(newCategory);
          }
        });
        newAppData.itemsData.forEach((item: itemTypes) => {
          appData.itemsData.push(item);
        });
        localStorage.setItem("appData", JSON.stringify(appData));
        return true;
      } else {
        return false;
      }
    }
  }
};
