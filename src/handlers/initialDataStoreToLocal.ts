"use client";
import { v4 as uuidv4 } from "uuid";
import { categoryTypes, itemTypes } from "../types/interface";
import words_test from "@/src/data/4.json";
import words_11plus from "@/src/data/11plus.json";

let words: string[];

process.env.NODE_ENV === "development"
  ? (words = words_11plus)
  : (words = words_11plus);

export const initialDataStoreToLocal = () => {
  if (typeof window !== "undefined") {
    const appDataJson: string | null = localStorage.getItem("appData");
    let itemsData: itemTypes[] = [];
    const categories: categoryTypes[] = [];
    if (!appDataJson) {
      categories.push({
        id: uuidv4(),
        name: "11plus",
        status: false,
        createdAt: Date.now(),
      });
      words?.forEach((word, i) => {
        itemsData!.push({
          id: uuidv4(),
          title: word,
          body: "",
          category: "11plus",
          createdAt: Date.now(),
          reviews: {
            box: 0,
            review: 0,
            lastReviewDate: 0,
          },
        });

        localStorage.setItem(
          "appData",
          JSON.stringify({ categories, itemsData })
        );
      });
    } else { // puting all the data in the box 1
      categories.push({
        id: uuidv4(),
        name: "11plus",
        status: false,
        createdAt: Date.now(),
      });
      const itemsData = JSON.parse(localStorage.getItem("appData")!).itemsData;
      itemsData.forEach((item: itemTypes) => {
        if (item.reviews.box === 0) {
          item.reviews.box = 1;
        }
      });
      localStorage.setItem(
        "appData",
        JSON.stringify({ categories, itemsData })
      );
    }
  }
};
