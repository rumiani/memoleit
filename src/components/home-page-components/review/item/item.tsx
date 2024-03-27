"use client";
import { itemTypes } from "@/src/types/interface";
import React from "react";
import Options from "./options/options";
import { daysToNowHandler } from "@/src/handlers/home/general/daysToNowHandler";
import Spinner from "../../../spinner/spinner";

export default function Item({
  item,
  goToNextItem,
}: {
  item: itemTypes | undefined;
  goToNextItem: any;
}) {
  if (!item)
    return (
      <div className="p-8 flex justify-center">
        <Spinner size={100} />
      </div>
    );
  return (
    <div className="word-box border border-gray-300 rounded-lg p-6 flex flex-col justify-between w-full sm:w-80 mx-auto mt-10">
      <div>
        <div className="relative flex justify-between mb-4">
          <h3
            id="days"
            title={`Created ${daysToNowHandler(item?.startedAt)} days ago`}
            className="text-sm"
          >
            {daysToNowHandler(item?.startedAt)} Days
          </h3>
          <Options item={item} />
        </div>
        <h2 id="title" className="text-2xl font-bold text-center">
          {item?.title}
        </h2>
        <p className="text-gray-600">{item?.body}</p>
      </div>
      <div className="buttons flex justify-between w-full mt-4">
        <button
          onClick={() => goToNextItem(item, false)}
          id="notLearned"
          className="bg-red-500 px-4 py-2 rounded text-white text-sm"
        >
          I don&apos;t know
        </button>
        <button
          onClick={() => goToNextItem(item, true)}
          id="learned"
          className="bg-green-500 px-4 py-2 rounded text-white text-sm"
        >
          I know
        </button>
      </div>
    </div>
  );
}
