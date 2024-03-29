"use client";
import React, { useEffect } from "react";
import Item from "../../item/item";
import { itemReducer, userReducer } from "@/src/redux/appStateSlice";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { isEmpty } from "lodash";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import NoResult from "./noResult/noResult";

export default function Review() {
  const { user, item } = useAppSelector((state) => state.appState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isEmpty(user.catagories)) return;
    const { catagories } = getAppDataHandler();
    const randomItem = randomItemHandler();
    if (!user.catagories) {
      dispatch(userReducer(catagories) && itemReducer(randomItem!));
    }
  }, [dispatch, user]);

  return <>{item.id ? <Item item={item}/> : <NoResult />}</>;
}
