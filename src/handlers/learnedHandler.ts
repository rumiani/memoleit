import { randomItemHandler } from "./randomItemHandler";
import { itemTypes } from "@/src/types/interface";
import { reviewHandler } from "./reviewHandler";

export function learnedHandler(currentItem: itemTypes | undefined, status: boolean) {
  // const items = storeToLocal();
  // const foundItem = items.find((item) => item.id === currentItem?.id);
  // const days = reviewHandler(foundItem!.createdAt).days;
  // if (foundItem && !status) {
  //   foundItem.createdAt = Date.now();
  // }
  // if (foundItem && days > 31) {
  //   foundItem.learned = true;
  // }
  // localStorage.setItem("itemsData", JSON.stringify(items));

  // return randomItemHandler(storeToLocal());
}
