import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { itemTypes } from "../types/interface";

interface itemProps {
  title: string;
  body: string;
  topic: string;
}
export const saveNewItemToLocal = ({ title, body, topic }: itemProps) => {
  const appDataJson: string | null = localStorage.getItem("appData");
  if (appDataJson) {
    let appData = JSON.parse(appDataJson);

    let { catagories, itemsData } = appData;

    if (!catagories[topic]) catagories[topic] = false;
    const itemObject: itemTypes = {
      id: uuidv4(),
      title,
      body,
      catagory: topic,
      createdAt: Date.now(),
      startedAt: Date.now(),
      learned: false,
      length: 0,
      tags: [],
    };
    itemsData.push(itemObject);
    localStorage.setItem("appData", JSON.stringify({ catagories, itemsData }));
    toast.success("The new item has been saved.");
  }
};
