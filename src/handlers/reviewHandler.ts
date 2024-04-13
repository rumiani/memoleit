import { itemTypes } from "@/src/types/interface";
import { getAppDataHandler } from "./getAppDataHandler";
import { toast } from "react-toastify";

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
      toast.success(
        `The item has been moved to the box ${foundItem.reviews.box + 1}`
      );
    } else {
      toast.success("Item moved to the box 0 and can be reviewed in 1 hour");
      foundItem.reviews.box = 1;
    }

    localStorage.setItem("appData", JSON.stringify(appData));
  }
}
