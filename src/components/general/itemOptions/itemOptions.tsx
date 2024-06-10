"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useParams, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { ItemTypes } from "@/src/types/interface";
import {
  allItemsReducer,
  itemReducer,
} from "@/src/redux/slices/itemStateSlice";
import { itemsCategoryIdFilterHandler } from "@/src/handlers/itemsCategoryIdFilterHandler";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { itemsToReviewHandler } from "@/src/handlers/itemsToReviewHandler";
import { db } from "@/src/services/db";
import notFoundError from "@/src/handlers/notFoundError";
import { useRouter } from "next/navigation";

export default function ItemOptions({ item }: { item: ItemTypes }) {
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();
  const category = useParams<{ id: string; category: string }>();
  const router = useRouter();
  const removeBtnFunction = async () => {
    setShowOptions(false);
    try {
      const foundItem = await db.items.get(item.id);
      if (!foundItem) throw notFoundError("404");
      await db.items.delete(item.id);
      if (item.id) {
        const filteredItemsData = await itemsCategoryIdFilterHandler(
          category.id
        );
        dispatch(allItemsReducer(filteredItemsData));
      } else {
        const itemsToReview = await itemsToReviewHandler();
        if (itemsToReview) {
          dispatch(allItemsReducer(itemsToReview));
          const newRandomItem = randomItemHandler(itemsToReview);
          dispatch(itemReducer(newRandomItem));
        }
      }
      router.push(`/box/category/${item.categoryId}/${item.category}`);
      toast.success("The item was removed.");
    } catch (error: any) {
      console.log("Error");
      if ((error.name = "404")) toast.error("Item was not found");
    }
  };
  const editBtnFunction = () => {
    setShowOptions(false);
  };

  const modelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modelRef.current &&
        !modelRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };
    if (showOptions) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showOptions]);
  return (
    <div className="z-10">
      <button onClick={() => setShowOptions(true)} className="icon">
        <BsThreeDotsVertical />
      </button>
      {showOptions && (
        <div
          ref={modelRef}
          className="absolute left-0 flex flex-col top-0 w-full h-32 rounded-lg shadow-gray-400 shadow-lg bg-white"
        >
          <button
            onClick={() => setShowOptions(false)}
            className="absolute right-2 top-2 rounded-full p-1 text-xl text-red-500 hover:bg-red-200 "
          >
            <IoClose />
          </button>
          <Link
            href={`/dashboard/edit/${item.id}`}
            className="mt-8 h-8 w-32 mx-auto hover:shadow-md rounded-lg text-yellow-500 hover:text-yellow-700"
          >
            <button
              onClick={() => editBtnFunction()}
              className="text-center w-full pt-2"
            >
              Edit
            </button>
          </Link>
          <button
            onClick={() => removeBtnFunction()}
            className="mt-2 h-8 w-32 mx-auto hover:shadow-md rounded-lg text-red-400 hover:text-red-600"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
