"use client";

import { db } from "@/src/services/db";
import { CategoryTypes, ItemTypes } from "../../../../types/interface";
import { randomIdGenerator } from "@/src/handlers/randomID";
import { userIdTest } from "@/src/services/userId";
import { makeUrlFriendly } from "@/src/handlers/makeUrlFriendly";
import { isEmpty } from "lodash";

export const saveNewDataToLocalHandler = async (newAppData: any) => {
  try {
    const newCategories: CategoryTypes[] = [];
    const newItems: ItemTypes[] = [];
    const existingCategories = await db.categories
      .where("name")
      .anyOf(newAppData.categories.map((category: any) => category.name))
      .toArray();
    const uniqueCategories = newAppData.categories.filter(
      (category: any) =>
        !existingCategories.some(
          (existingCategory) => existingCategory.name === category.name
        )
    );
    uniqueCategories.forEach((importedCategory: CategoryTypes) => {
      const newCategory = {
        id: importedCategory.id,
        userId: userIdTest,
        name: makeUrlFriendly(importedCategory.name),
        status: importedCategory.status,
        createdAt: importedCategory.createdAt,
      };
      newCategories.push(newCategory);
    });
    await db.categories.bulkAdd(newCategories);

    const existingItems = await db.items
      .where("id")
      .anyOf(newAppData.items.map((item: any) => item.id))
      .toArray();
    const uniqueItems = newAppData.items.filter(
      (item: any) =>
        !existingItems.some((existingItem) => existingItem.id === item.id)
    );
    for (const importedItem of uniqueItems) {
      const existedCategory = await db.categories.get({
        name: makeUrlFriendly(importedItem.category),
      });
      if (existedCategory) {
        const newItem: ItemTypes = {
          id: importedItem.id,
          userId: userIdTest,
          categoryId: existedCategory!.id,
          title: importedItem.title,
          body: importedItem.body,
          category: importedItem.category,
          box: importedItem.box,
          createdAt: importedItem.createdAt,
          lastReview: importedItem.lastReviewDate,
        };
        newItems.push(newItem);
      }
    }
    if (!isEmpty(newItems)) {
      await db.items.bulkAdd(newItems);
    }
  } catch (error) {
    console.log("Error");
  }
};
