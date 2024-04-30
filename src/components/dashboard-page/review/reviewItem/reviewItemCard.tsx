"use client";
import React from "react";
import Options from "./options/options";
import ItemProgress from "./itemProgress/itemProgress";
import ItemBody from "./itemBody/itemBody";
import { capitalize } from "lodash";
import Link from "next/link";
import { reviewHandler } from "@/src/handlers/reviewHandler";
import { useAppDispatch } from "@/src/app/hooks";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { toast } from "react-toastify";
import { ItemTypes } from "@/src/types/interface";
import { itemReducer } from "@/src/redux/slices/itemStateSlice";
import { getCategoryUrl } from "@/src/handlers/getCategoryUrl";

export default function ReviewItemCard({ item }: { item: ItemTypes }) {
  const dispatch = useAppDispatch();

  const goToNextItem = (item: ItemTypes, status: boolean) => {
    const reviewResult = reviewHandler(item, status);
    reviewResult
      ? toast.success(
          `The item has been moved to the box ${item.reviews.box + 1}`
        )
      : toast.success("Item moved to the box 1 and can be reviewed tomorrow");
    const newRandomItem = randomItemHandler();
    dispatch(itemReducer(newRandomItem!));
  };
  return (
    <div className=" animate-merge word-box border border-gray-300 rounded-lg p-6 mb-8 sm:mb-16 flex flex-col justify-between w-full max-w-80 mx-auto">
      <div>
        <div className="relative flex justify-between">
          <Link
            href={getCategoryUrl(item.category)}
            title={"category: " + capitalize(item.category)}
            className="text-blue-700 hover:text-blue-400 text-md font-bold pt-3"
          >
            <h2>{capitalize(item.category)}</h2>
          </Link>
          <Options item={item} />
        </div>
        <h3 id="title" className="text-2xl font-bold text-center my-6">
          {capitalize(item.title)}
        </h3>
      </div>
      <div className="buttons flex justify-around w-full mt-4 gap-2">
        <button
          onClick={() => goToNextItem(item, false)}
          className="primaryBtn !px-0 !w-42 !bg-red-500"
        >
          I don&apos;t know
        </button>
        <button
          onClick={() => goToNextItem(item, true)}
          className="primaryBtn !bg-green-500"
        >
          I know
        </button>
      </div>
      <div className="mt-8">
        <ItemBody body={item.body} />
        <ItemProgress itemBoxNumber={item.reviews.box} />
      </div>
    </div>
  );
}
