import Dexie, { Table } from "dexie";
import {
  CategoryTypes,
  ItemTypes,
  ReviewTypes,
  SettingTypes,
} from "../types/interface";

export class MySubClassedDexie extends Dexie {
  items!: Table<ItemTypes>;
  categories!: Table<CategoryTypes>;
  reviews!: Table<ReviewTypes>;
  setting!: Table<SettingTypes>;
  constructor() {
    super("memoLeitDatabase");
    this.version(1).stores({
      items: "++id, userId, categoryId, title, body, category , box, createdAt, lastUpdate",
      reviews: "++id,userId, itemId, status, createdAt",
      categories: "++id,userId, name, status, createdAt",
      settings:
        "++id, userId, isReviewSoundOn, rightAnswerSoundSrc,  wrongAnswerSoundSrc, isTextToSpeechOn, isDictionaryOn, isTourOn",
    });
  }
}

export const db = new MySubClassedDexie();
