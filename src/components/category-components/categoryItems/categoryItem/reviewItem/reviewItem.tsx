"use client";
import { itemTypes } from "@/src/types/interface";
import React from "react";
import Options from "./options/options";
import ItemBody from "./itemBody/itemBody";
import _ from "lodash";
import Link from "next/link";
export default function ReviewItem({ item }: { item: itemTypes }) {

  return (
    <div className=" animate-merge word-box border border-gray-300 rounded-lg p-6 flex flex-col justify-between w-full max-w-96 mx-auto mt-10">
      <div>
        <div className="relative flex justify-between">
          <Link
            href={"/categories/" + _.capitalize(item.category)}
            title={"category: " + _.capitalize(item.category)}
            className="text-blue-700 hover:text-blue-400 text-md font-bold pt-3"
          >
            <h2>{_.capitalize(item.category)}</h2>
          </Link>
          <Options item={item} />
        </div>
        <h3 id="title" className="text-2xl font-bold text-center my-6">
          {_.capitalize(item.title)}
        </h3>
      </div>
      <div className="mt-8">
        <ItemBody body={item.body} />
      </div>
    </div>
  );
}
