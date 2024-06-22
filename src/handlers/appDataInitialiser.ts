"use client";
import { v4 as uuidv4 } from "uuid";
import { ItemTypes } from "../types/interface";
import words from "@/src/data/initialData.json";
import { db } from "../services/db";
import { userIdTest } from "../services/userId";
import { reviewSounds } from "../data/reviewSounds";
import { randomIdGenerator } from "./randomID";
import { makeUrlFriendly } from "./makeUrlFriendly";

const hoursAgo = [12, 73, 26, 75, 745, 24, 72, 250, 359, 743];
const timestamps = hoursAgo.map((hours) => Date.now() - hours * 3600 * 1000);
const wordsObject = words.map((word, i) => {
  return { word, box: Math.floor(i / 2) + 1 };
});

export const appDataInitialiser = async () => {
  try {
    const isFirstTime = await db.setting.count();
    if (isFirstTime > 0) {
      // const items = await db.items.toArray();
      // for (const item of items) {
      //   try {
      //     item.body = convertFromRaw(JSON.parse(item.body)).getPlainText();
      //   } catch (error) {}
      //   await db.items.update(item.id, { body: item.body });
      // }
      return;
    }

    const categoryId = randomIdGenerator(8);
    const category = {
      id: categoryId,
      userId: userIdTest,
      name: makeUrlFriendly("11 plus"),
      status: 1,
      createdAt: Date.now() - 1000 * 3600 * 1000,
    };
    await db.categories.add(category);

    const itemsData: ItemTypes[] = [];
    words?.forEach((title, i) => {
      itemsData!.push({
        id: uuidv4(),
        userId: userIdTest,
        categoryId,
        title,
        body: "",
        category: makeUrlFriendly("11 plus"),
        box: wordsObject[i].box,
        createdAt: Date.now() - 1000 * 3600 * 1000,
        lastReview: timestamps[i],
      });
    });

    await db.items.bulkPut(itemsData);

    const settings = {
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
      tour: { reviewTour: false, newItemTour: false, boxTour: false },
    };
    await db.setting.add(settings);
  } catch (error) {
    console.log("error", error);
  }
};
