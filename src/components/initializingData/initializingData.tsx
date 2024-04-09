'use client'
import React, { useEffect } from 'react'
import { initialDataStoreToLocal } from "@/src/handlers/initialDataStoreToLocal";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { categoriesReducer, itemReducer } from "@/src/redux/appStateSlice";
import { useAppDispatch } from "@/src/app/hooks";

export default function InitializingData() {
    const dispatch = useAppDispatch();
    useEffect(() => {
      initialDataStoreToLocal();
      const { categories } = getAppDataHandler();
      const randomItem = randomItemHandler();                  
      dispatch(categoriesReducer(categories))    
      dispatch( itemReducer(randomItem!));
    }, [dispatch]);

  return null
}
