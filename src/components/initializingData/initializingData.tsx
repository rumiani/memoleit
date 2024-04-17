"use client";
import React, { useEffect } from "react";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { itemReducer } from "@/src/redux/appStateSlice";
import { useAppDispatch } from "@/src/app/hooks";
import { categoriesReducer } from "@/src/redux/categoryStateSlice";
import { appDataInitialiser } from "@/src/handlers/appDataInitialiser";

export default function InitializingData() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    appDataInitialiser();
    const { categories } = getAppDataHandler();
    const randomItem = randomItemHandler();
    dispatch(categoriesReducer(categories));
    dispatch(itemReducer(randomItem!));
  }, [dispatch]);
  return null;
}
