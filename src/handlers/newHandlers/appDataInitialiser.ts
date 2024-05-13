"use client";
import { v4 as uuidv4 } from "uuid";
import { ItemTypes } from "../../types/interface";
import words from "@/src/data/initialData.json";
import { db } from "../../services/db";
import { userIdTest } from "../../services/userId";
import { randomIdGenerator } from "./randomID";
import { reviewSounds } from "../../data/reviewSounds";
import { isEmpty } from "lodash";
import { makeUrlFriendly } from "./makeUrlFriendly";

const hoursAgo = [12, 73, 26, 75, 745, 24, 72, 250, 359, 743];
const timestamps = hoursAgo.map((hours) => Date.now() - hours * 3600 * 1000);
const wordsObject = words.map((word, i) => {
  return { word, box: Math.floor(i / 2) + 1 };
});

export const appDataInitialiser = async () => {
  const isFirstTime = await db.categories
    .toArray()
    .then((categoriesArray) => isEmpty(categoriesArray))
    .catch(() => console.log("error"));
  if (!isFirstTime) return;

  const categoryId = randomIdGenerator(8);
  const category = {
    id: categoryId,
    userId: userIdTest,
    name: makeUrlFriendly("11 plus"),
    status: false,
    createdAt: Date.now() - 1000 * 3600 * 1000,
  };

  db.categories
    .add(category)
    .then((id) => {
      console.log(id);
    })
    .catch((error) => {
      console.log("error");
    });

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

  db.items
    .bulkPut(itemsData)
    .then((id) => {
      console.log(`Item was added with ID: ${id}`);
    })
    .catch((error) => {
      console.error(`error adding item`, error);
    });

  const settings = {
    id: randomIdGenerator(8),
    name:'setting',
    userId: userIdTest,
    isReviewSoundOn: false,
    rightAnswerSoundSrc: reviewSounds.right[0].src,
    wrongAnswerSoundSrc: reviewSounds.wrong[0].src,
    isTextToSpeechOn: false,
    isDictionaryOn: false,
    isTourOn: false,
  };
  db.setting
    .add(settings)
    .then((id) => {
      console.log(`Item was added with ID: ${id}`);
    })
    .catch((error) => {
      console.error(`error adding item`, error);
    });
};
