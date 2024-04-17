"use client";
import ItemsNav from "@/src/components/dashboardLayout/dashboardLayout";
import InitializingData from "@/src/components/initializingData/initializingData";
import { useAppDispatch } from "../hooks";
import { useEffect } from "react";
import { appDataInitialiser } from "@/src/handlers/appDataInitialiser";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { categoriesReducer } from "@/src/redux/categoryStateSlice";
import { itemReducer } from "@/src/redux/appStateSlice";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    appDataInitialiser();
    const { categories } = getAppDataHandler();
    const randomItem = randomItemHandler();
    dispatch(categoriesReducer(categories));
    dispatch(itemReducer(randomItem!));
  }, [dispatch]);

  return (
    <section>
      <nav>
        {" "}
        <ItemsNav />
      </nav>
      {children}
    </section>
  );
}
