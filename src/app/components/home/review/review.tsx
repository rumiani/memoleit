"use client";
import React, { useEffect, useState } from "react";
import { learnedHandler } from "@/src/handlers/learnedHandler";
import { itemTypes } from "@/src/types/interface";
import { reviewHandler } from "@/src/handlers/reviewHandler";
import Item from "./item/item";
import { useDispatch, useSelector } from "react-redux";
import { itemReducer } from "@/src/redux/appStateSlice";

export default function Review() {
  const { user, item } = useSelector((state) => state.appState);
  const dispatch = useDispatch();

  const goToNextItem = (item: itemTypes, status: boolean) => {
    let newRandomItem = learnedHandler(item, status);
    if (newRandomItem) {
      const days = reviewHandler(newRandomItem.createdAt).days;
      newRandomItem = { ...newRandomItem, days };
    }
    dispatch(itemReducer(newRandomItem));
  };

  useEffect(()=>{
    // dispatch();
  },[])

  return (
    <div>
      {user.catagories.length !== 0 ? (
        <div className="word-box border border-gray-300 rounded-lg p-6 flex flex-col justify-between w-full sm:w-80 mx-auto mt-10">
          <Item item={item} goToNextItem={goToNextItem} />
        </div>
      ) : (
        <p className="text-red-500 mt-5">
          There is no item to review.
          <br />
          Please click on filters button and choose a catagory or add a new item
          to review.
        </p>
      )}
    </div>
  );
}
