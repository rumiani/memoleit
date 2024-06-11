import { ItemTypes } from "@/src/types/interface";
import { timeToReviewHandler } from "../home/general/timeToReview";
export default function itemsCountHandler(items: ItemTypes[]) {
  const allLearnedItems = items.filter((item: ItemTypes) => item.box > 5);
  const allItemsCount = items.length;
  const learnedCount = allLearnedItems.length;
  const unLearnedCount = allItemsCount - learnedCount;  
  const pending = items.filter( item => timeToReviewHandler(item)).length
  return { allItemsCount, learnedCount, unLearnedCount, pending };
}
 