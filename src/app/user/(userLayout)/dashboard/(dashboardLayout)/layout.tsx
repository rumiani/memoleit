"use client";
import { useAppDispatch } from "@/src/app/hooks";
import { superPages } from "@/src/components/general/layouts/generalLayout/header/profile/userOpetions/superpages/superpages";
import SuperPageLayout from "@/src/components/general/layouts/superPageLayout/superPageLayout";
import { appDataInitialiser } from "@/src/handlers/appDataInitialiser";
import { storedSettingReducer } from "@/src/redux/slices/settingStateSlice";
import { db } from "@/src/services/db";
import { useEffect } from "react";
export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    appDataInitialiser();
    db.setting
      .where("name")
      .equals("setting")
      .first()
      .then((storedSetting) => {
        if (storedSetting) dispatch(storedSettingReducer(storedSetting!));
      })
      .catch(() => {
        console.log("Error");
      });
  }, [dispatch]);
  return (
    <section>
      <SuperPageLayout links={superPages.dashboard.links} />
      {children}
    </section>
  );
}
