import { ItemTypes } from "@/src/types/interface";
import { getAppDataHandler } from "./getAppDataHandler";
import { saveAppDataHandler } from "./saveAppDataHandler";

export function reviewHandler(
  currentItem: ItemTypes | undefined,
  status: boolean
) {
  const appData = getAppDataHandler();
  const foundItem = appData.itemsData.find(
    (item: ItemTypes) => item.id === currentItem?.id
  );
  if (foundItem) {
    foundItem.reviews.lastReviewDate = Date.now();
    foundItem.reviews.review += 1;
    if (status) {
      foundItem.reviews.box += 1;
      saveAppDataHandler(appData)
      return true;
    } else {
      foundItem.reviews.box = 1;
      saveAppDataHandler(appData)
      return false;
    }
  }
}
