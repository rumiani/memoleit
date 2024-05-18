"use client";
import React, { useState } from "react";
import ItemOptions from "@/src/components/general/itemOptions/itemOptions";
import ItemBody from "@/src/components/general/itemBody/itemBody";
import ItemProgress from "@/src/components/general/itemProgress/itemProgress";
import { capitalize, random, sample } from "lodash";
import Link from "next/link";
import { reviewHandler } from "@/src/handlers/reviewHandler";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { toast } from "react-toastify";
import { ItemTypes } from "@/src/types/interface";
import { itemReducer } from "@/src/redux/slices/itemStateSlice";
import ItemTitle from "@/src/components/general/itemTitle/itemTitle";
import { getCategoryUrl } from "@/src/handlers/newHandlers/getCategoryUrl";
import { itemsToReviewHandler } from "@/src/handlers/itemsToReviewHandler";

const randomBGcolor =[
    "bg-red-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-gray-100",
    "bg-orange-100",
  ]
export default function ReviewItemCard({ item }: { item: ItemTypes }) {
  const { rightAnswerSoundSrc, wrongAnswerSoundSrc } = useAppSelector(
    (state) => state.settingState
  );
  const [isdisabled, setIsdisabled] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const goToNextItem = async (item: ItemTypes, answer: number) => {
    setIsdisabled(true);
    try {
      const reviewResult = await reviewHandler(item, answer);
      if (reviewResult) {
        const audio = new Audio(rightAnswerSoundSrc);
        audio.play();
        toast.success(`The item has been moved to the box ${item.box + 1}`);
      } else {
        const audio = new Audio(wrongAnswerSoundSrc);
        audio.play();
        toast.success("Item moved to the box 1 and can be reviewed tomorrow");
      }
      const itemsToReview = await itemsToReviewHandler();
      if (itemsToReview) {
        const newRandomItem = randomItemHandler(itemsToReview);
        dispatch(itemReducer(newRandomItem));
        setTimeout(() => setIsdisabled(false), 1000);
      }
    } catch (error: any) {
      if (error.name === "404") {
        toast.error("Item was not found.");
      }
      console.log();
    }
  };
  return (
    <div className={`${sample(randomBGcolor)} animate-merge word-box border border-gray-300 rounded-lg p-4 my-8 sm:my-16 flex flex-col justify-between w-full max-w-80 h-fit max-h-96 overflow-y-auto mx-auto`}>
      <div>
        <div className="relative flex justify-between">
          <Link
            href={getCategoryUrl(item.category, item.id)}
            title={"category: " + capitalize(item.category)}
            className="text-blue-700 hover:text-blue-400 text-md font-bold pt-3"
          >
            <h2>{capitalize(item.category)}</h2>
          </Link>
          <ItemOptions item={item} />
        </div>
        <ItemTitle title={item.title} />
      </div>
      <div className="buttons flex justify-around w-full mt-4 gap-2">
        <button
          onClick={() => goToNextItem(item, 0)}
          disabled={isdisabled}
          className="primaryBtn !px-0 !w-42 !bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          I don&apos;t know
        </button>
        <button
          onClick={() => goToNextItem(item, 1)}
          disabled={isdisabled}
          className="primaryBtn !bg-green-500  disabled:cursor-not-allowed disabled:opacity-50"
        >
          I know
        </button>
      </div>
      <div className="mt-8">
        <ItemBody body={item.body} />
        <ItemProgress itemBoxNumber={item.box} />
      </div>
    </div>
  );
}
