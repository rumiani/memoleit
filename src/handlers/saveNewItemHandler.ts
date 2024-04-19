import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { FormValues, categoryTypes, itemTypes } from "../types/interface";


export const saveNewItemToLocal = ({ title, body, category }: FormValues) => {
  const appDataJson: string | null = localStorage.getItem("appData");
  if (appDataJson) {
    let appData = JSON.parse(appDataJson);

    let { categories, itemsData } = appData;
    const categoryExists = categories.find(
      (savedCategory: categoryTypes) => savedCategory.name === category
    );
    if (!categoryExists)
      categories.push({
        id: uuidv4(),
        name: category,
        status: false,
        createdAt: Date.now(),
      });
    const itemObject: itemTypes = {
      id: uuidv4(),
      title,
      body,
      category: category,
      createdAt: Date.now(),
      reviews: {
        box: 1,
        review: 0,
        lastReviewDate: Date.now(),
      },
    };
    itemsData.push(itemObject);
    localStorage.setItem("appData", JSON.stringify({ categories, itemsData }));
    toast.success("The new item has been saved.");
  }
};
