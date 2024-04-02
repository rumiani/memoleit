"use client";
import DashboardComps from "@/src/components/dashboard-components/dashboardComps";
import { initialDataStoreToLocal } from "@/src/handlers/initialDataStoreToLocal";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { isEmpty } from "lodash";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { itemReducer, userReducer } from "@/src/redux/appStateSlice";

export default function Dashboard() {
  const { user } = useAppSelector((state) => state.appState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    initialDataStoreToLocal();
    if (!isEmpty(user.catagories)) return;
    const { catagories } = getAppDataHandler();
    const randomItem = randomItemHandler();
    dispatch(userReducer(catagories) && itemReducer(randomItem!));
  }, [dispatch, user]);

  return (
    <div>
      <DashboardComps />
    </div>
  );
}
