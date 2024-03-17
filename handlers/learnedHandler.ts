import storeToLocal from "@/app/components/review/storeToLocal";
import { randomItemHandler } from "./randomItemHandler";
import { item } from "@/types/interface";

export function learnedHandler(currentItem: item | undefined, status: boolean) {
  console.log(currentItem, status);
  
  const items = storeToLocal();
  const foundItem = items.find((item) => item.id === currentItem?.id);
  if (foundItem) {
    status ? (foundItem.learned = true) : (foundItem.createdAt = Date.now());
  }
console.log(foundItem);

  localStorage.setItem("itemsData", JSON.stringify(items));

  return randomItemHandler(storeToLocal());
}
