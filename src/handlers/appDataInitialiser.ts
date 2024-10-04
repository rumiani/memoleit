"use client";
import { v4 as uuidv4 } from "uuid";
import { ItemTypes } from "../types/interface";
import words from "@/src/data/initialExampleWords.json";
import { db } from "../services/db";
import { userIdTest } from "../services/userId";
import { reviewSounds } from "../data/reviewSounds";
import { randomIdGenerator } from "./randomID";
import { makeUrlFriendly } from "./makeUrlFriendly";

const hoursAgo = [12, 73, 26, 75, 745, 24, 72, 250, 359, 743];
const timestamps = hoursAgo.map((hours) => Date.now() - hours * 3600 * 1000);
const wordsObject = words.map((word, i) => ({
  word,
  box: Math.floor(i / 2) + 1,
}));

export const appDataInitialiser = async () => {
  try {
    const categoryId = randomIdGenerator(8);
    const categoryName = makeUrlFriendly("Example Category");
    const category = {
      id: categoryId,
      userId: userIdTest,
      name: categoryName,
      status: false,
      createdAt: Date.now() - 1000 * 3600 * 1000,
    };

    const itemsData: ItemTypes[] = [];
    words?.forEach((title, i) => {
      itemsData!.push({
        id: uuidv4(),
        userId: userIdTest,
        categoryId,
        title,
        body: "",
        category: categoryName,
        box: wordsObject[i].box,
        createdAt: Date.now() - 1000 * 3600 * 1000,
        lastReview: timestamps[i],
      });
    });
    //
    let setting = await db.setting.where("name").equals("setting").first();
    if (setting) {
      // update setting
      setting.wordLists = setting.wordLists || [];
    } else {
      setting = {
        id: randomIdGenerator(8),
        name: "setting",
        userId: userIdTest,
        selectAllCategories: false,
        isReviewSoundOn: false,
        rightAnswerSoundSrc: reviewSounds.right[0].src,
        wrongAnswerSoundSrc: reviewSounds.wrong[0].src,
        isTextToSpeechOn: true,
        textToSpeechLang: "en-US",
        isDictionaryOn: false,
        leitnerTextSelectionMode: true,
        wordLists: [],
        tour: { reviewTour: false, newItemTour: false, boxTour: false },
      };
      await db.categories.add(category);
      await db.items.bulkPut(itemsData);
    }
    await db.setting.put(setting);
    return true;
  } catch (error) {
    console.log("error", error);
  }
};
