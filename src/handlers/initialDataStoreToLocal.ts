"use client";
import { v4 as uuidv4 } from "uuid";
import { itemTypes } from "../types/interface";
import words_test from "@/src/data/4.json";
import words_11plus from "@/src/data/11plus.json";

let words: string[];

process.env.NODE_ENV === "development"
  ? (words = words_test)
  : (words = words_11plus);
export const initialDataStoreToLocal = () => {
  if (typeof window !== "undefined") {
    const appDataJson: string | null = localStorage.getItem("appData");
    let itemsData: itemTypes[] = [];
    let catagories = { catagories: { "11plus": false } };
    if (!appDataJson) {
      words?.forEach((word, i) => {
        itemsData!.push({
          id: uuidv4(),
          title: word,
          body: "",
          catagory: "11plus",
          reviews: {
            box: 0,
            startedAt: Date.now(),
          },
          createdAt: Date.now(),
          startedAt: Date.now(),
        });
        console.log({ ...catagories, itemsData });

        localStorage.setItem(
          "appData",
          JSON.stringify({ ...catagories, itemsData })
        );
      });
    }
  }
};
