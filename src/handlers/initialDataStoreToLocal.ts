import { v4 as uuidv4 } from "uuid";
import { itemTypes } from "../types/interface";
import words_test from "@/src/data/4.json";
import words_11plus from "@/src/data/11plus.json";

let words:string[]

process.env.NODE_ENV === "development"
  ? (words = words_test)
  : (words = words_11plus);
export const initialDataStoreToLocal = () => {
  const appDataJson: string | null = localStorage.getItem("appData");
  let appData;
  let itemsData: itemTypes[] = [];
  let catagories = {catagories:{'11plus':false}}
  if (appDataJson) {
    console.log('exist');
    
    // appData = JSON.parse(appDataJson) as itemTypes[];
  } else {
    words?.forEach((word, i) => {
      itemsData!.push({
            id: uuidv4(),
            title: word,
            body: "",
            catagory: "",
            createdAt: Date.now(),
            learned: false,
            days: 0,
            shouldReview: false,
            length: 0,
            tags: [],
          });
    });
    appData = {...catagories, itemsData}
    localStorage.setItem("appData", JSON.stringify(appData));
  }
};
