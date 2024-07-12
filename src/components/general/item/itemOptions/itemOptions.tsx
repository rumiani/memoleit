"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { ItemTypes } from "@/src/types/interface";
import {
  allItemsReducer,
  itemReducer,
  numberOfItemsToReviewReducer,
} from "@/src/redux/slices/itemStateSlice";
import { itemsCategoryIdFilterHandler } from "@/src/handlers/itemsCategoryIdFilterHandler";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { db } from "@/src/services/db";
import notFoundError from "@/src/handlers/notFoundError";
import { useRouter } from "next/navigation";
import { itemsToReviewWithActiveCategoryHandler } from "@/src/handlers/itemsToReviewWithActiveCategoryHandler";
import { DialogOptions } from "../../dialogOptions/dialogOptions";
import { getCategoryUrl } from "@/src/handlers/getUrls/getCategoryUrl";
import { numberOfItemsToReviewHandler } from "@/src/handlers/numberOfItemsToReviewHandler";
import {
  isCategoryPage,
  isItemPage,
  isReviewPage,
} from "@/src/handlers/general/isPage";
import { editPageUrl, itemPageUrl } from "@/src/handlers/general/pagesLinks";
import { useAppDispatch } from "@/src/app/hooks";

export default function ItemOptions({ item }: { item: ItemTypes }) {
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useAppDispatch();
  const category = useParams<{ id: string; category: string }>();
  const router = useRouter();
  const path = usePathname();

  const removeBtnFunction = async () => {
    setShowOptions(false);
    try {
      const foundItem = await db.items.get(item.id);
      if (!foundItem) throw notFoundError("404");
      await db.items.delete(item.id);

      if (isReviewPage(path)) {
        const numberOfItems = await numberOfItemsToReviewHandler();
        if (numberOfItems)
          dispatch(numberOfItemsToReviewReducer(numberOfItems));
        const itemsToReview = await itemsToReviewWithActiveCategoryHandler();
        if (itemsToReview) {
          dispatch(allItemsReducer(itemsToReview));
          const newRandomItem = randomItemHandler(itemsToReview);
          dispatch(itemReducer(newRandomItem));
        }
      }
      if (isCategoryPage(path)) {
        const filteredItemsData = await itemsCategoryIdFilterHandler(
          category.id,
        );
        dispatch(allItemsReducer(filteredItemsData));
        router.push(getCategoryUrl(item.categoryId, item.category));
      }
      if (isItemPage(path)) {
        router.push(getCategoryUrl(item.categoryId, item.category));
      }
      toast.success("The item was removed.");
    } catch (error: any) {
      console.log("Error");
      if ((error.name = "404")) toast.error("Item was not found");
    }
  };

  return (
    <div className="z-10 relative">
      <DialogOptions showOptions={showOptions} setShowOptions={setShowOptions}>
        <div className="flex flex-col">
          <Link
            href={editPageUrl + item.id}
            className=" text-yellow-500 hover:text-yellow-700 optionsBtn"
          >
            Edit
          </Link>
          {!isItemPage(path) && (
            <Link
              href={itemPageUrl + item.id}
              className=" text-blue-400 hover:text-blue-600 optionsBtn"
            >
              Open Item
            </Link>
          )}
          <button
            onClick={() => removeBtnFunction()}
            className="w-full  text-red-400 hover:text-red-600 optionsBtn "
          >
            Remove
          </button>
        </div>
      </DialogOptions>
    </div>
  );
}
