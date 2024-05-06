"use client";
import { v4 as uuidv4 } from "uuid";
import { CategoryTypes, ItemTypes, SettingTypes } from "../types/interface";
import words from "@/src/data/initialData.json";
import { getAppDataHandler } from "./getAppDataHandler";

const hoursAgo = [12, 73, 26, 75, 745, 24, 72, 250, 359, 743];
const timestamps = hoursAgo.map((hours) => Date.now() - hours * 3600 * 1000);
const wordsObject = words.map((word, i) => {
  return { word, box: Math.floor(i / 2) + 1 };
});
export const appDataInitialiser = () => {
  if (typeof window !== "undefined") {
    const appDataJson: string | null = localStorage.getItem("appData");
    let itemsData: ItemTypes[] = [];
    const categories: CategoryTypes[] = [];
    let settings: SettingTypes;
    if (!appDataJson) {
      categories.push({
        id: uuidv4(),
        name: "11 plus",
        status: false,
        createdAt: Date.now() - 1000 * 3600 * 1000,
      });
      words?.forEach((title, i) => {
        itemsData!.push({
          id: uuidv4(),
          title,
          body: "",
          category: "11 plus",
          createdAt: Date.now() - 1000 * 3600 * 1000,
          reviews: {
            box: wordsObject[i].box,
            review: 0,
            lastReviewDate: timestamps[i],
          },
        });

        settings = {
          reviewSounds: {
            isSoundOn: false,
            right: 1,
            wrong: 1,
          },
          isTextToSpeechOn: false,
          isDictionaryOn: false,
          isTourOn: false,
        };
        localStorage.setItem(
          "appData",
          JSON.stringify({ settings, categories, itemsData })
        );
      });
    }
    // only to update the new settings object. The code will be removed later
    const appData =  JSON.parse(appDataJson!);    
    if(appDataJson && !appData.settings.reviewSounds.right){      
      appData.settings = {
        reviewSounds: {
          isSoundOn: false,
          right: 1,
          wrong: 1,
        },
        isTextToSpeechOn: false,
        isDictionaryOn: false,
        isTourOn: false,
      };
      localStorage.setItem(
        "appData",
        JSON.stringify(appData)
      );
    }
  }
};
