"use client";
import React, { useState } from "react";
import ItemOptions from "@/src/components/general/item/itemOptions/itemOptions";
import ItemBody from "@/src/components/general/item/itemBody/itemBody";
import ItemProgress from "@/src/components/general/item/itemProgress/itemProgress";
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
import Spinner from "@/src/components/general/loading-comps/spinner/spinner";
import { itemsToReviewWithActiveCategoryHandler } from "@/src/handlers/itemsToReviewWithActiveCategoryHandler";
import { numberOfItemsToReviewHandler } from "@/src/handlers/itemsToReviewHandler";
import ItemCategory from "@/src/components/general/item/itemCategory/itemCategory";
import Answer from "@/src/components/general/answer/answer";
import ItemInfo from "@/src/components/general/item/itemInfo/itemInfo";
import ItemTitle from "@/src/components/general/item/itemTitle/itemTitle";

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
            : `The item has been moved to the box ${item.box + 1}.`,
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
          <ItemCategory item={item} />
          <ItemOptions item={item} />
        </div>
      </div>
      <ItemProgress itemBoxNumber={item.box} />
      <ItemTitle item={item} />
      <ItemBody body={item.body} />
      <Answer goToNextItem={goToNextItem} item={item} />
    </div>
  );
}
