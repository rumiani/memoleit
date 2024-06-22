"use client";

import { db } from "@/src/services/db";
import { ItemTypes } from "../../../../types/interface";
import { makeUrlFriendly } from "@/src/handlers/makeUrlFriendly";
import { isEmpty } from "lodash";
import { dataSchema } from "../validation/validation";

export const saveNewImportedDataHandler = async (newJsonData: string) => {
  try {
    const validatedData = dataSchema.parse(newJsonData);
    const existingCategories = await db.categories
      .where("name")
      .anyOf(validatedData.categories.map((category: any) => category.name))
      .toArray();
    const uniqueCategories = validatedData.categories.filter(
      (category: any) =>
        !existingCategories.some(
          (existingCategory) => existingCategory.name === category.name,
        ),
    );
    if (!isEmpty(uniqueCategories))
      await db.categories.bulkAdd(uniqueCategories);

    const newItems: ItemTypes[] = [];
    const existingItems = await db.items
      .where("id")
      .anyOf(validatedData.items.map((item: any) => item.id))
      .toArray();
    const uniqueItems = validatedData.items.filter(
      (item: any) =>
        !existingItems.some((existingItem) => existingItem.id === item.id),
    );
    for (const importedItem of uniqueItems) {
      const existedCategory = await db.categories.get({
        name: makeUrlFriendly(importedItem.category),
      });
      if (existedCategory) {
        newItems.push(importedItem);
      }
    }
    if (!isEmpty(newItems)) {
      await db.items.bulkAdd(newItems);
    }
  } catch (error) {
    throw error;
  }
};
