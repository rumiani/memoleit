import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { FormValues, CategoryTypes, ItemTypes } from "../../../types/interface";
import { db } from "@/src/services/db";
import { userIdTest } from "@/src/services/userId";
import { randomIdGenerator } from "@/src/handlers/newHandlers/randomID";

export const saveNewItemToLocal = ({ title, body, category }: FormValues) => {
  console.log({ title, body, category });
  
  db.categories
    .where("name")
    .equals(category)
    .first()
    .then((storedCategory) => {
      if (storedCategory) {
        createNewItemHandler(storedCategory.id);
        console.log("Retrieved category:", category);
      } else {
        createNewCategoryHandler(category);
        console.log(`Catecategory with name ${category} not found.`);
      }
    })
    .catch((error) => {
      console.error("Error retrieving category:", error);
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
        console.log(`Item was added with ID: ${id}`);
      })
      .catch((error) => {
        console.error(`error adding item`, error);
      });
  };

  const createNewCategoryHandler = (category: string) => {
    const categoryObject: CategoryTypes = {
      id: randomIdGenerator(8),
      userId: userIdTest,
      name: category.trim(),
      status: false,
      createdAt: Date.now(),
    };
    db.categories
      .add(categoryObject)
      .then((id) => {
        createNewItemHandler(id);
        console.log(`Category was added with ID: ${id}`);
      })
      .catch((error) => {
        console.error(`error adding item`, error);
      });
  };
};
