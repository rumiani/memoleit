import { itemTypes } from "@/src/types/interface";
import { getAppDataHandler } from "./getAppDataHandler";

export function reviewHandler(
  currentItem: itemTypes | undefined,
  status: boolean
) {
  const appData = getAppDataHandler();
  const foundItem = appData.itemsData.find(
    (item: itemTypes) => item.id === currentItem?.id
  );
  if (foundItem) {
    foundItem.reviews.lastReviewDate = Date.now();
    foundItem.reviews.review += 1;
    if (status) {
      foundItem.reviews.box += 1;
      localStorage.setItem("appData", JSON.stringify(appData));
      return true;
    } else {
      foundItem.reviews.box = 1;
      localStorage.setItem("appData", JSON.stringify(appData));
      return false;
    }
  }
}
