import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { db } from "@/src/services/db";
import { randomIdGenerator } from "@/src/handlers/randomID";
import { FormValues, ItemTypes, CategoryTypes } from "@/src/types/interface";
import { makeUrlFriendly } from "@/src/handlers/makeUrlFriendly";
import { getSession } from "next-auth/react";

export const saveNewItemToLocal = async ({
  title,
  body,
  category,
}: FormValues) => {
  try {
    const session = await getSession();
    const createNewItemHandler = async (categoryId: string) => {
      const itemObject: ItemTypes = {
        id: uuidv4(),
        userId: session?.user?.email!,
        categoryId,
        title: makeUrlFriendly(title),
        body,
        category: makeUrlFriendly(category),
        box: 1,
        createdAt: Date.now(),
        lastReview: Date.now(),
      };
      await db.items.add(itemObject);
      toast.success("The new item has been saved.");
    };

    const createNewCategoryHandler = async (category: string) => {
      const categoryObject: CategoryTypes = {
        id: randomIdGenerator(8),
        userId: session?.user?.email!,
        name: makeUrlFriendly(category),
        status: false,
        createdAt: Date.now(),
      };
      const savedCategoryId = await db.categories.add(categoryObject);
      createNewItemHandler(savedCategoryId);
    };

    const foundCategory = await db.categories
      .where("name")
      .equals(makeUrlFriendly(category))
      .first();
    if (foundCategory) {
      createNewItemHandler(foundCategory.id);
    } else {
      createNewCategoryHandler(category);
    }
  } catch (error) {}
};
