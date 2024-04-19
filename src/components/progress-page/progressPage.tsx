import React, { useEffect } from "react";
import BoxChart from "./boxChart/boxChart";
import { useAppDispatch } from "@/src/app/hooks";
import { appDataInitialiser } from "@/src/handlers/appDataInitialiser";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { categoriesReducer } from "@/src/redux/categoryStateSlice";

export default function ProgressPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    appDataInitialiser();
    const { categories } = getAppDataHandler();
    dispatch(categoriesReducer(categories));
  }, [dispatch]);
  return (
    <>
      <BoxChart />
    </>
  );
}
