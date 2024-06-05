import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { FormValues, CategoryTypes, ItemTypes } from "../../../types/interface";
import { db } from "@/src/services/db";
import { userIdTest } from "@/src/services/userId";
import { randomIdGenerator } from "@/src/handlers/randomID";

export const saveNewItemToLocal = ({ title, body, category }: FormValues) => {  
  db.categories
    .where("name")
    .equals(category.toLowerCase())
    .first()
    .then((storedCategory) => {
      if (storedCategory) {
        createNewItemHandler(storedCategory.id);
      } else {
        createNewCategoryHandler(category);
      }
    })
    .catch((error) => {
      console.log("Error retrieving category:", error);
    });

  const createNewItemHandler = (categoryId: string) => {
    const itemObject: ItemTypes = {
      id: uuidv4(),
      userId: userIdTest,
      categoryId,
      title,
      body,
      category,
      box: 1,
      createdAt: Date.now(),
      lastReview: Date.now(),
    };
    db.items
      .add(itemObject)
      .then((id) => {
        toast.success("The new item has been saved.");
      })
      .catch((error) => {
        console.log(`error adding item`, error);
      });
  };

  const createNewCategoryHandler = (category: string) => {
    const categoryObject: CategoryTypes = {
      id: randomIdGenerator(8),
      userId: userIdTest,
      name: category.trim(),
      status: 0,
      createdAt: Date.now(),
    };
    db.categories
      .add(categoryObject)
      .then((id) => {
        createNewItemHandler(id);
      })
      .catch((error) => {
        console.log(`error adding item`, error);
      });
  };
};
