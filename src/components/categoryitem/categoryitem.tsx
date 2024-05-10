"use client";
import { ItemTypes } from "@/src/types/interface";
import React from "react";
import ItemBody from "../general/itemBody/itemBody";
import Link from "next/link";
import { capitalize } from "lodash";
import ItemProgress from "../general/itemProgress/itemProgress";
import ItemOptions from "../general/itemOptions/itemOptions";
import ItemTitle from "../general/itemTitle/itemTitle";
import { getCategoryUrl } from "@/src/handlers/newHandlers/getCategoryUrl";

export default function CategoryItem({ item }: { item: ItemTypes }) {
  return (
    <div className=" animate-merge word-box h-64 overflow-y-auto border border-gray-300 rounded-lg p-6 flex flex-col justify-between w-60 sm:w-72 mx-auto my-4">
      <div>
        <div className="relative flex justify-between">
          <Link
            href={getCategoryUrl(item.category,item.categoryId)}
            title={"category: " + capitalize(item.category)}
            className="text-blue-700 hover:text-blue-400 text-md font-bold pt-3"
          >
            <h2>{capitalize(item.category)}</h2>
          </Link>
          <ItemOptions item={item} />
        </div>
        <ItemTitle title={item.title} />
      </div>
      <ItemBody body={item.body} />
      <ItemProgress itemBoxNumber={item.box} />
    </div>
  );
}
