import { item } from "@/types/interface";
import { v4 as uuidv4 } from "uuid";

export default function storeToLocal(items?: string[]) {
  const localStorageData: string | null = localStorage.getItem("itemsData");
  let itemsData: item[] = [];
  if (localStorageData) {
    itemsData = JSON.parse(localStorageData) as item[];
  }else {
    items?.forEach((item, i) => {
      itemsData!.push({
        id: uuidv4(),
        title: item,
        description: "",
        subject: "11 plus",
        createdAt: Date.now(),
        learned: false,
      });
    });    
    localStorage.setItem("itemsData", JSON.stringify(itemsData));
  }
  return itemsData
}
