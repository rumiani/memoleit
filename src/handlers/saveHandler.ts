import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

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

    itemsData.push({
      id: uuidv4(),
      title,
      body,
      catagory: topic,
      createdAt: Date.now(),
      learned: false,
      days: 0,
      shouldReview: false,
      length: 0,
      tags: [],
    });

    console.log(appData);
    localStorage.setItem("appData", JSON.stringify({ catagories, itemsData }));
    toast.success("The new item has been saved.");
  }
};
