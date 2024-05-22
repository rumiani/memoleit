"use client";
import React, { useState } from "react";
import ItemOptions from "@/src/components/general/itemOptions/itemOptions";
import ItemBody from "@/src/components/general/itemBody/itemBody";
import ItemProgress from "@/src/components/general/itemProgress/itemProgress";
import { capitalize, sample } from "lodash";
import Link from "next/link";
import { reviewHandler } from "@/src/handlers/reviewHandler";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { toast } from "react-toastify";
import { ItemTypes } from "@/src/types/interface";
import { itemReducer } from "@/src/redux/slices/itemStateSlice";
import ItemTitle from "@/src/components/general/itemTitle/itemTitle";
import { getCategoryUrl } from "@/src/handlers/getCategoryUrl";
import { itemsToReviewHandler } from "@/src/handlers/itemsToReviewHandler";
import Spinner from "@/src/components/loading-comps/spinner/spinner";

export default function ReviewItemCard({ item }: { item: ItemTypes }) {
  const { isReviewSoundOn, rightAnswerSoundSrc, wrongAnswerSoundSrc } =
    useAppSelector((state) => state.settingState);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const goToNextItem = async (item: ItemTypes, answer: number) => {
    setLoading(true);
    try {
      const reviewResult = await reviewHandler(item, answer);
      if (reviewResult) {
        if (isReviewSoundOn) new Audio(rightAnswerSoundSrc).play();
        toast.success(`The item has been moved to the box ${item.box + 1}`);
      } else {
        if (isReviewSoundOn) new Audio(wrongAnswerSoundSrc).play();
        toast.success("Item moved to the box 1 and can be reviewed tomorrow");
      }
      const itemsToReview = await itemsToReviewHandler();
      if (itemsToReview) {
        const newRandomItem = randomItemHandler(itemsToReview);
        setTimeout(() => {
          dispatch(itemReducer(newRandomItem));
          setLoading(false);
        }, 500);
      }
    } catch (error: any) {
      if (error.name === "404") {
        toast.error("Item was not found.");
      }
    }
  };
  if (loading) {
    return (
      <div className="my-24">
        <Spinner size={100} />
      </div>
    );
  }
  return (
    <div
      className={`animate-merge word-box border border-gray-300 rounded-lg p-4 my-16 flex flex-col justify-between w-full max-w-80 h-4/5 overflow-y-auto mx-auto`}
    >
        <div className="relative flex justify-between">
          <Link
            href={getCategoryUrl(item.categoryId, item.category)}
            title={"category: " + capitalize(item.category)}
            className="text-blue-700 hover:text-blue-400 text-md font-bold pt-3"
          >
            <h2>{capitalize(item.category)}</h2>
          </Link>
          <ItemOptions item={item} />
        </div>
        <ItemTitle title={item.title} />
      <div className="h-52 overflow-y-auto">
        <ItemBody body={item.body} />
      </div>
      <div>
        <div className="buttons flex justify-around w-full gap-2">
          <button
            onClick={() => goToNextItem(item, 0)}
            className="primaryBtn !px-0 !w-42 !bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            I don&apos;t know
          </button>
          <button
            onClick={() => goToNextItem(item, 1)}
            className="primaryBtn !bg-green-500  disabled:cursor-not-allowed disabled:opacity-50"
          >
            I know
          </button>
        </div>
        <ItemProgress itemBoxNumber={item.box} />
      </div>
    </div>
  );
}
