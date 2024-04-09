import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { categoryTypes, itemTypes } from "../types/interface";

interface itemProps {
  title: string;
  body: string;
  topic: string;
}
export const saveNewItemToLocal = ({ title, body, topic }: itemProps) => {
  const appDataJson: string | null = localStorage.getItem("appData");
  if (appDataJson) {
    let appData = JSON.parse(appDataJson);

    let { categories, itemsData } = appData;
    const categoryExists = categories.find(
      (category: categoryTypes) => category.name === topic
    );
    if (!categoryExists)
      categories.push({
        id: uuidv4(),
        name: topic,
        status: false,
        createdAt: Date.now(),
      });
    const itemObject: itemTypes = {
      id: uuidv4(),
      title,
      body,
      category: topic,
      createdAt: Date.now(),
      reviews: {
        box: 0,
        review: 0,
        lastReviewDate: 0,
      },
    };
    itemsData.push(itemObject);
    localStorage.setItem("appData", JSON.stringify({ categories, itemsData }));
    toast.success("The new item has been saved.");
  }
};
