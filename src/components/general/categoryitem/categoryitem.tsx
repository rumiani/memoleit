"use client";
import { ItemTypes } from "@/src/types/interface";
import ItemBody from "../item/itemBody/itemBody";
import ItemProgress from "../item/itemProgress/itemProgress";
import ItemOptions from "../item/itemOptions/itemOptions";
import ItemCategory from "../item/itemCategory/itemCategory";
import ItemTitle from "../item/itemTitle/itemTitle";

export default function CategoryItem({ item }: { item: ItemTypes }) {
  return (
    <div className="bg-blue-50 word-box overflow-y-auto border border-gray-300 rounded-lg p-2 flex flex-col justify-between w-full min-w-72 max-w-80 h-52 mx-auto my-4">
      <div className="flex justify-between">
        <ItemCategory item={item} />
        <ItemOptions item={item} />
      </div>
      <ItemTitle item={item} />
      <ItemBody body={item.body} />
      <ItemProgress itemBoxNumber={item.box} />
    </div>
  );
}
