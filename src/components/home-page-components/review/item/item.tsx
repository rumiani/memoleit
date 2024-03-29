"use client";
import { itemTypes } from "@/src/types/interface";
import React, { useState } from "react";
import Options from "./options/options";
import { daysToNowHandler } from "@/src/handlers/home/general/daysToNowHandler";
import Spinner from "../../../spinner/spinner";
import ItemProgress from "./itemProgress/itemProgress";
import ItemBody from "./itemBody/itemBody";
import _ from "lodash";

export default function Item({
  item,
  goToNextItem,
}: {
  item: itemTypes;
  goToNextItem: any;
}) {
  return (
    <div className="word-box border border-gray-300 rounded-lg p-6 flex flex-col justify-between w-full max-w-96 mx-auto mt-10">
      <div>
        <div className="relative flex justify-between">
          <h2 id="catagory" title={'catagory: '+_.capitalize(item.catagory)} className="text-md font-bold pt-3 cursor-default">
            {_.capitalize(item.catagory)}
          </h2>
          <Options item={item} />
        </div>
        <h3 id="title" className="text-2xl font-bold text-center my-6">
          {_.capitalize(item.title)}
        </h3>
      </div>
      <div className="buttons flex justify-around w-full mt-4">
        <button
          onClick={() => goToNextItem(item, false)}
          id="notLearned"
          className="primaryBtn !bg-red-500"
        >
          I don&apos;t know
        </button>
        <button
          onClick={() => goToNextItem(item, true)}
          id="learned"
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
