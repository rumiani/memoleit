"use client";
import React, { useEffect } from "react";
import { reviewHandler } from "@/src/handlers/reviewHandler";
import { itemTypes } from "@/src/types/interface";
import Item from "./item/item";
import { itemReducer, userReducer } from "@/src/redux/appStateSlice";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { isEmpty } from "lodash";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";

export default function Review() {
  const { user, item } = useAppSelector((state) => state.appState);
  const dispatch = useAppDispatch();

  const goToNextItem = (item: itemTypes, status: boolean) => {
    let newRandomItem = reviewHandler(item, status);
    if (newRandomItem) {
      dispatch(itemReducer({ ...newRandomItem }));
    }
  };

  useEffect(() => {
    if (!isEmpty(user.catagories)) return;
    const { catagories } = getAppDataHandler();
    dispatch(userReducer({ catagories }));

    const randomItem = randomItemHandler();
    console.log(randomItem);
    
    if (randomItem) dispatch(itemReducer(randomItem));
  }, [dispatch, user]);

  return (
    <div>
      {randomItemHandler() ? (
        <Item item={item} goToNextItem={goToNextItem} />
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
