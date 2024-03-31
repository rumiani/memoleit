"use client";
import { itemTypes } from "@/src/types/interface";
import React from "react";
import Options from "./options/options";
import ItemProgress from "./itemProgress/itemProgress";
import ItemBody from "./itemBody/itemBody";
import _ from "lodash";
import Link from "next/link";
import { reviewHandler } from "@/src/handlers/reviewHandler";
import { itemReducer } from "@/src/redux/appStateSlice";
import { useAppDispatch } from "@/src/app/hooks";

export default function Item({item}:{item:itemTypes}) {
  const dispatch = useAppDispatch();

  const goToNextItem = (item: itemTypes, status: boolean) => {
    let newRandomItem = reviewHandler(item, status);
      dispatch(itemReducer(newRandomItem!));
  };
  return (
    <div className="word-box border border-gray-300 rounded-lg p-6 flex flex-col justify-between w-full max-w-96 mx-auto mt-10">
      <div>
        <div className="relative flex justify-between">
          <Link
            href={"/catagory/" + _.capitalize(item.catagory)}
            title={"catagory: " + _.capitalize(item.catagory)}
            className="text-blue-700 hover:text-blue-400 text-md font-bold pt-3"
          >
            <h2>{_.capitalize(item.catagory)}</h2>
          </Link>
          <Options item={item} />
        </div>
        <h3 id="title" className="text-2xl font-bold text-center my-6">
          {_.capitalize(item.title)}
        </h3>
      </div>
      <div className="buttons flex justify-around w-full mt-4 gap-2">
        <button
          onClick={() => goToNextItem(item, false)}
          className="primaryBtn !w-42 !bg-red-500"
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
