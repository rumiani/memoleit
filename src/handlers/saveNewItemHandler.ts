import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { catagoryTypes, itemTypes } from "../types/interface";

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
    const catagoryExists = catagories.find( (catagory:catagoryTypes) => catagory.name === topic );    
    if (!catagoryExists) catagories.push({ name:topic,status:false, createdAt:Date.now()});
    const itemObject: itemTypes = {
      id: uuidv4(),
      title,
      body,
      catagory:topic,
      reviews: {
        box:0,
        startedAt:Date.now()
      },
      createdAt: Date.now(),
      startedAt: Date.now(),
    };
    itemsData.push(itemObject);
    localStorage.setItem("appData", JSON.stringify({ catagories, itemsData }));
    toast.success("The new item has been saved.");
  }
};
