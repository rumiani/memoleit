import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { FormValues, CategoryTypes, ItemTypes } from "../types/interface";
import { makeUrlFriendly } from "./makeUrlFriendly";

export const saveEditedItemHandler = (
  { title, body, category }: FormValues,
  id: string
) => {
  const appDataJson: string | null = localStorage.getItem("appData");
  if (appDataJson) {
    let appData = JSON.parse(appDataJson);

    let { categories, itemsData } = appData;
    const categoryExists = categories.find(
      (savedCategory: CategoryTypes) => savedCategory.name === category
    );
    if (!categoryExists)
      categories.push({
        id: uuidv4(),
        url: makeUrlFriendly(category),
        name: category,
        status: false,
        createdAt: Date.now(),
      });
    const itemExists = itemsData.find((item: CategoryTypes) => item.id === id);
    if (itemExists) {
      itemExists.title = title;
      itemExists.body = body;
      itemExists.category = category;
      localStorage.setItem(
        "appData",
        JSON.stringify({ categories, itemsData })
      );
      toast.success("The new item has been saved.");
    } else {
      toast.error("The item does not exist.");
    }
  }
};
