"use client";

import { db } from "@/src/services/db";
import { CategoryTypes, ItemTypes } from "../../../../types/interface";
import { randomIdGenerator } from "@/src/handlers/newHandlers/randomID";
import { userIdTest } from "@/src/services/userId";
import { makeUrlFriendly } from "@/src/handlers/newHandlers/makeUrlFriendly";

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
        id: randomIdGenerator(8),
        userId: userIdTest,
        name: makeUrlFriendly(importedCategory.name),
        status: 1,
        createdAt: importedCategory.createdAt,
      };
      newCategories.push(newCategory);
    });
    const categoriesResponse = await db.categories.bulkAdd(newCategories);

    const existingItems = await db.items
      .where("id")
      .anyOf(newAppData.itemsData.map((item: any) => item.id))
      .toArray();
    const uniqueItems = newAppData.itemsData.filter(
      (item: any) =>
        !existingItems.some((existingItem) => existingItem.id === item.id)
    );

    uniqueItems.forEach(async (importedItem: any) => {
      const existedCategory = await db.categories
        .where("name")
        .equals(importedItem.category)
        .first();
      const newItem: ItemTypes = {
        id: importedItem.id,
        userId: userIdTest,
        categoryId: existedCategory!.id,
        title: importedItem.title,
        body: importedItem.body,
        category: importedItem.category,
        box: importedItem.reviews.box,
        createdAt: importedItem.createdAt,
        lastReview: importedItem.reviews.lastReviewDate,
      };
      newItems.push(newItem);
    });
    const itemsResponse = await db.items.bulkAdd(uniqueItems);

    if (itemsResponse && categoriesResponse) return true;
  } catch (error) {
    console.log("Error");
  }
};
