"use client";

import { db } from "@/src/services/db";
import { isEmpty } from "lodash";
import { textDataSchema } from "../validation/textValidation";
import { ItemTypes } from "@/src/types/interface";
import { userIdTest } from "@/src/services/userId";

export const saveImportedTextHandler = async (newJsonData: string) => {
  try {
    const validatedData = textDataSchema.parse(newJsonData);

    const categoriesToAdd = [];
    const itemsToAdd: ItemTypes[] = [];

    // Gather categories to add, avoiding duplicates
    const existingCategoryIds = new Set(
      (await db.categories.toArray()).map((category) => category.id),
    );

    for (const importedCategory of validatedData.categories) {
      if (!existingCategoryIds.has(importedCategory.id)) {
        categoriesToAdd.push(importedCategory);
      }
    }

    const existingItemIds = new Set(
      (await db.items.toArray()).map((item) => item.id),
    );

    for (const item of validatedData.items) {
      if (!existingItemIds.has(item.id)) {
        const existedCategory = await db.categories.get({
          id: item.categoryId,
        });
        if (!existedCategory) {
          const newCategory = {
            id: item.categoryId,
            userId: userIdTest,
            name: item.category,
            status: true,
            createdAt: Date.now(),
          };
          categoriesToAdd.push(newCategory);
        }
        itemsToAdd.push(item); // Add the item regardless, as it's new
      }
    }
    if (categoriesToAdd.length > 0) {
      await db.categories.bulkAdd(categoriesToAdd);
    }
    if (itemsToAdd.length > 0) {
      await db.items.bulkAdd(itemsToAdd);
    }
  } catch (error) {
    throw error;
  }
};
