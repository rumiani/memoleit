import { ItemTypes } from "@/src/types/interface";
export default function itemsCountHandler(items: ItemTypes[]) {
  const allLearnedItems = items.filter((item: ItemTypes) => item.box > 5);
  const allItemsCount = items.length;
  const learnedCount = allLearnedItems.length;
  const unLearnedCount = allItemsCount - learnedCount;
  return { allItemsCount, learnedCount, unLearnedCount };
}
