"use client";
import { ItemTypes } from "@/src/types/interface";
import React from "react";
import ItemBody from "../general/itemBody/itemBody";
import Link from "next/link";
import { capitalize } from "lodash";
import { getCategoryUrl } from "@/src/handlers/getCategoryUrl";
import ItemProgress from "../general/itemProgress/itemProgress";
import ItemOptions from "../general/itemOptions/itemOptions";

export default function CategoryItem({ item }: { item: ItemTypes }) {

  return (
    <div className=" animate-merge word-box h-64 overflow-y-auto border border-gray-300 rounded-lg p-6 flex flex-col justify-between w-60 sm:w-72 mx-auto my-4">
      <div>
        <div className="relative flex justify-between">
          <Link
            href={getCategoryUrl(item.category)}
            title={"category: " + capitalize(item.category)}
            className="text-blue-700 hover:text-blue-400 text-md font-bold pt-3"
          >
            <h2>{capitalize(item.category)}</h2>
          </Link>
          <ItemOptions item={item} />
        </div>
        <h3 id="title" className="text-2xl font-bold text-center my-6">
          {capitalize(item.title)}
        </h3>
      </div>
      <ItemBody body={item.body} />
      <ItemProgress itemBoxNumber={item.reviews.box} />
    </div>
  );
}
