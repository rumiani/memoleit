"use client";
import { ItemTypes } from "@/src/types/interface";
import React from "react";
import ItemBody from "../general/itemBody/itemBody";
import ItemProgress from "../general/itemProgress/itemProgress";
import ItemOptions from "../general/itemOptions/itemOptions";
import ItemTitle from "../general/itemTitle/itemTitle";
import ItemCategory from "../general/itemCategory/itemCategory";

export default function CategoryItem({ item }: { item: ItemTypes }) {
  return (
    <div className="animate-merge word-box h-fit overflow-y-auto border border-gray-300 rounded-lg p-2 flex flex-col justify-between w-full min-w-72 max-w-80 mx-auto my-4">
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
