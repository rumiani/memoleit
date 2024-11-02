"use client";

import { db } from "@/src/services/db";
import { makeUrlFriendly } from "@/src/handlers/makeUrlFriendly";
import { ItemTypes } from "@/src/types/interface";
import { csvDataSchema } from "../validation/csvValidation";
import { randomIdGenerator } from "@/src/handlers/randomID";
import { v4 as uuidv4 } from "uuid";
import { getSession } from "next-auth/react";

export const saveImportedCSVHandler = async (
    csvArrayData: string,
    fileName: string,
) => {
  try {
    const session = await getSession();
    const validatedData = csvDataSchema.parse(csvArrayData);
    const categoryId = randomIdGenerator(8);
    const categoryName = makeUrlFriendly(fileName);
    const category = {
      id: categoryId,
      userId: session?.user?.email!,
      name: categoryName,
      status: false,
      createdAt: Date.now(),
    };
    await db.categories.add(category);
    const itemsData: ItemTypes[] = [];
    validatedData?.forEach((item: { [key: string]: string }) => {

      itemsData!.push({
        id: uuidv4(),
        userId: session?.user?.email!,
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
