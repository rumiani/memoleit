import Dexie, { Table } from "dexie";
import {
  CategoryTypes,
  ItemTypes,
  PdfTypes,
  ReviewTypes,
  SettingTypes,
} from "../types/interface";
if (typeof window !== "undefined") {
}
export class MySubClassedDexie extends Dexie {
  items!: Table<ItemTypes>;
  categories!: Table<CategoryTypes>;
  reviews!: Table<ReviewTypes>;
  setting!: Table<SettingTypes>;
  pdfs!: Table<PdfTypes>;

  constructor() {
    super("memoLeitDatabase");
    this.version(1).stores({
      items:
        "++id, userId, categoryId, title, body, category , box, createdAt, lastReview",
      reviews: "++id,userId, itemId, answer, createdAt",
      categories: "++id,userId, name, status, createdAt",
      setting:
        "++id, name, userId , isReviewSoundOn, rightAnswerSoundSrc,  wrongAnswerSoundSrc, isTextToSpeechOn, textToSpeechLang, isDictionaryOn, tour",
      pdfs: "++id, name, file, createdAt",
    });
  }
}

export const db = new MySubClassedDexie();
