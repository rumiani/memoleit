"use client";

import { db } from "@/src/services/db";
import { makeUrlFriendly } from "@/src/handlers/makeUrlFriendly";
import { ItemTypes } from "@/src/types/interface";
import { csvDataSchema } from "../validation/csvValidation";
import { randomIdGenerator } from "@/src/handlers/randomID";
import { userIdTest } from "@/src/services/userId";
import { v4 as uuidv4 } from "uuid";

export const saveImportedCSVHandler = async (
    scvArrayData: string,
    fileName: string,
) => {
  try {
    const validatedData = csvDataSchema.parse(scvArrayData);
    const categoryId = randomIdGenerator(8);
    const categoryName = makeUrlFriendly(fileName);
    const category = {
      id: categoryId,
      userId: userIdTest,
      name: categoryName,
      status: false,
      createdAt: Date.now(),
    };
    await db.categories.add(category);
    const itemsData: ItemTypes[] = [];
    validatedData?.forEach((item: { [key: string]: string }) => {

      itemsData!.push({
        id: uuidv4(),
        userId: userIdTest,
        categoryId,
        title:Object.values(item)[0],
        body:Object.values(item)[1],
        category: categoryName,
        box: 1,
        createdAt: Date.now(),
        lastReview: Date.now(),
      });
    });

    await db.items.bulkPut(itemsData);
  } catch (error) {
    throw error;
  }
};
