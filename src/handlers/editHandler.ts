import storeToLocal from "@/src/app/components/review/storeToLocal";
import { randomItemHandler } from "./randomItemHandler";

export const editHandler = (id: string) => {
  console.log(id);
  const items = storeToLocal();
  const restItems = items.filter((item) => item.id !== id);
  localStorage.setItem("itemsData", JSON.stringify(restItems));
  return randomItemHandler(storeToLocal());
};
