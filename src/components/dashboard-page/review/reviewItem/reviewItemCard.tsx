"use client";
import React, { useState } from "react";
import ItemOptions from "@/src/components/general/itemOptions/itemOptions";
import ItemBody from "@/src/components/general/itemBody/itemBody";
import ItemProgress from "@/src/components/general/itemProgress/itemProgress";
import { capitalize } from "lodash";
import Link from "next/link";
import { reviewHandler } from "@/src/handlers/reviewHandler";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { toast } from "react-toastify";
import { ItemTypes } from "@/src/types/interface";
import {
  allItemsReducer,
  itemReducer,
  numberOfItemsToReviewReducer,
} from "@/src/redux/slices/itemStateSlice";
import ItemTitle from "@/src/components/general/itemTitle/itemTitle";
import { getCategoryUrl } from "@/src/handlers/getCategoryUrl";
import Spinner from "@/src/components/loading-comps/spinner/spinner";
import ItemInfo from "@/src/components/general/itemInfo/itemInfo";
import { itemsToReviewWithActiveCategoryHandler } from "@/src/handlers/itemsToReviewWithActiveCategoryHandler";
import { numberOfItemsToReviewHandler } from "@/src/handlers/itemsToReviewHandler";

export default function ReviewItemCard() {
  const { isReviewSoundOn, rightAnswerSoundSrc, wrongAnswerSoundSrc } =
    useAppSelector((state) => state.settingState);
  const [loading, setLoading] = useState<boolean>(false);
  const { item } = useAppSelector((state) => state.itemState);
  const dispatch = useAppDispatch();

  const goToNextItem = async (item: ItemTypes, answer: boolean) => {
    setLoading(true);
    try {
      await reviewHandler(item, answer);
      if (answer) {
        isReviewSoundOn && new Audio(rightAnswerSoundSrc).play();
        toast.success(
          item.box === 5
            ? "Item has been archived."
            : `The item has been moved to the box ${item.box + 1}.`
        );
      } else {
        isReviewSoundOn && new Audio(wrongAnswerSoundSrc).play();
        toast.success("Item moved to the box 1 and can be reviewed tomorrow");
      }
      const itemsToReview = await itemsToReviewWithActiveCategoryHandler();
      if (itemsToReview) {
        dispatch(allItemsReducer(itemsToReview));
        const newRandomItem = randomItemHandler(itemsToReview);
        setTimeout(() => {
          dispatch(itemReducer(newRandomItem));
          setLoading(false);
        }, 300);
      }
      const numberOfItemsToReview = await numberOfItemsToReviewHandler();
      dispatch(numberOfItemsToReviewReducer(numberOfItemsToReview!));
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
    <div className=" word-box border border-gray-300 rounded-lg pt-0 p-4 mb-24 sm:mb-1 flex flex-col justify-between w-full max-w-80 mx-auto">
      <div className="flex flex-row">
        <ItemInfo item={item} />
        <div className="relative w-full flex justify-between">
          <Link
            href={getCategoryUrl(item.categoryId, item.category)}
            title={"category: " + capitalize(item.category)}
            className="text-blue-700 hover:text-blue-400 text-md font-bold pt-3"
          >
            <h2>{capitalize(item.category)}</h2>
          </Link>
          <ItemOptions item={item} />
        </div>
      </div>
      <ItemProgress itemBoxNumber={item.box} />
      <ItemTitle item={item} />
      <ItemBody body={item.body} />
      <div>
        <div className="buttons flex justify-around w-full gap-2">
          <button
            onClick={() => goToNextItem(item, false)}
            className="third-element primaryBtn !px-0 !w-42 !bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            I don&apos;t know
          </button>
          <button
            onClick={() => goToNextItem(item, true)}
            className="fourth-element primaryBtn !bg-green-500  disabled:cursor-not-allowed disabled:opacity-50"
          >
            I know
          </button>
        </div>
      </div>
    </div>
  );
}
