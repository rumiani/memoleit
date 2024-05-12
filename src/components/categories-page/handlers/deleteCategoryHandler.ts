import { db } from "@/src/services/db";
import notFoundError from "@/src/handlers/newHandlers/notFoundError";

export default function deleteCategoryHandler(categoryId: string) {
  return db.categories
    .get(categoryId)
    .then((category) => {
      if (!category) throw notFoundError("404");
      db.categories
        .delete(categoryId)
        .then(() => {
          return db.items.where("categoryId").equals(categoryId).toArray();
        })
        .then((itemsToDelete) => {
          return Promise.all(
            itemsToDelete.map((item) => db.items.delete(item.id))
          );
        })
        .then(() => {
          db.categories.toArray().then((categories) => {
            return categories;
          });
        });
    })
    .catch((error) => {
      return error;
    });
}
