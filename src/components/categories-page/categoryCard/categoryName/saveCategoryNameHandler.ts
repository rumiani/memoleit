import { ItemTypes } from "../../../../types/interface";
import { db } from "@/src/services/db";
import { toast } from "react-toastify";

export default function saveCategoryNameHandler({
  categoryId,
  newCategoryName,
}: {
  categoryId: string;
  newCategoryName: string;
}) {
  return db.categories
    .get(categoryId)
    .then((category) => {
      if (category) {
        category!.name = newCategoryName;
        db.categories.put(category!).then((result) => {
          console.log(result);
        });
        db.items
          .where("categoryId")
          .equals(categoryId)
          .toArray()
          .then((items: ItemTypes[]) => {
            const updatedItems = items.map((item) => {
              item.category = newCategoryName;
              return item;
            });
            db.items.bulkPut(updatedItems).then((result) => {
              console.log(result);
            });
          });
      } else {
        toast.error("Category not found.");
      }
    })
    .catch(() => {
      console.log("Opps! Something went wrong.");
    });
}
