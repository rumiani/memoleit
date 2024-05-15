import Dexie, { Table } from "dexie";
import {
  CategoryTypes,
  ItemTypes,
  ReviewTypes,
  SettingTypes,
} from "../types/interface";
import { appDataInitialiser } from "../handlers/newHandlers/appDataInitialiser";

export class MySubClassedDexie extends Dexie {
  items!: Table<ItemTypes>;
  categories!: Table<CategoryTypes>;
  reviews!: Table<ReviewTypes>;
  setting!: Table<SettingTypes>;
  constructor() {
    super("memoLeitDatabase");
    this.version(1).stores({
      items: "++id, userId, categoryId, title, body, category , box, createdAt, lastReview",
      reviews: "++id,userId, itemId, answer, createdAt",
      categories: "++id,userId, name, status, createdAt",
      setting:
        "++id, name, userId, isReviewSoundOn, rightAnswerSoundSrc,  wrongAnswerSoundSrc, isTextToSpeechOn, isDictionaryOn, isTourOn",
    });
  }
}

export const db = new MySubClassedDexie();
