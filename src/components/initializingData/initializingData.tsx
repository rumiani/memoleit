'use client'
import React, { useEffect } from 'react'
import { initialDataStoreToLocal } from "@/src/handlers/initialDataStoreToLocal";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { catagoriesReducer, itemReducer } from "@/src/redux/appStateSlice";
import { useAppDispatch } from "@/src/app/hooks";

export default function InitializingData() {
    const dispatch = useAppDispatch();

    useEffect(() => {
      initialDataStoreToLocal();
      const { catagories } = getAppDataHandler();
      const randomItem = randomItemHandler();                  
      dispatch(catagoriesReducer(catagories))    
      dispatch( itemReducer(randomItem!));
    }, [dispatch]);

  return null
}
