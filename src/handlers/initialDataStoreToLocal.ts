"use client";
import { v4 as uuidv4 } from "uuid";
import { catagoryTypes, itemTypes } from "../types/interface";
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
    const catagories: catagoryTypes[] = [];
    if (!appDataJson) {
      catagories.push({ name: "11plus", status: false, createdAt: Date.now() });
      words?.forEach((word, i) => {
        itemsData!.push({
          id: uuidv4(),
          title: word,
          body: "",
          catagory: "11plus",
          createdAt: Date.now(),
          reviews: {
            box: 0,
            review:0,
            lastReviewDate: Date.now(),
          }
        });

        localStorage.setItem(
          "appData",
          JSON.stringify({ catagories, itemsData })
        );
      });
    }
  }
};
