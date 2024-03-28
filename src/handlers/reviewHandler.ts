import { randomItemHandler } from "./randomItemHandler";
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
    foundItem.reviews.startedAt = Date.now();
    if (status) {
      foundItem.reviews.box += 1;
      toast.success(`The item has been moved to the box ${foundItem.reviews.box + 1}`)
    } else {
      toast.success('The item has been moved to the first box')
      foundItem.reviews.box = 0;
    }

    localStorage.setItem("appData", JSON.stringify(appData));

    return randomItemHandler();
  }
}
