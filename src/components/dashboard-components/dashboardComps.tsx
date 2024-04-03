import React, { useEffect } from "react";
import ItemsNav from "./navItems/NavItems";
import Review from "./review/review";
import { initialDataStoreToLocal } from "@/src/handlers/initialDataStoreToLocal";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { catagoriesReducer, itemReducer } from "@/src/redux/appStateSlice";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";

export default function DashboardComps() {
  const { user } = useAppSelector((state) => state.appState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    initialDataStoreToLocal();
    const { catagories } = getAppDataHandler();
    const randomItem = randomItemHandler();                  
    dispatch(catagoriesReducer(catagories))    
    dispatch( itemReducer(randomItem!));
  }, [dispatch, user]);

  return (
    <>
      <ItemsNav />
      <Review />
    </>
  );
}
