"use client";

import { CategoryTypes, ItemTypes } from "../../../../types/interface";

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
        newAppData.categories.forEach((newCategory: CategoryTypes) => {
          const categoryExists = appData.categories.find(
            (category: CategoryTypes) => category.name === newCategory.name
          );
          if (!categoryExists) {
            appData.categories.push(newCategory);
          }
        });
        newAppData.itemsData.forEach((newItem: ItemTypes) => {
          const itemExists = appData.itemsData.find(
            (item: CategoryTypes) => item.id === newItem.id
          );
          if (!itemExists) {
            appData.itemsData.push(newItem);
          }
        });
        localStorage.setItem("appData", JSON.stringify(appData));
        return true;
      } else {
        return false;
      }
    }
  }
};
