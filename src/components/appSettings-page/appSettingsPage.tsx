import React, { useEffect } from "react";
import Sounds from "./sounds/sounds";
import { storedSettingReducer } from "@/src/redux/slices/settingStateSlice";
import { db } from "@/src/services/db";
import { useAppDispatch } from "@/src/app/hooks";

export default function AppSettingsPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    db.setting
      .where("name")
      .equals("setting")
      .first()
      .then((storedSetting) => {
        console.log("Init", storedSetting);
        if (storedSetting) dispatch(storedSettingReducer(storedSetting!));
      })
      .catch(() => {
        console.log("Error");
      });
  }, [dispatch]);

  return (
    <div className="w-full p-4 border border-gray-300 h-fit">
      <Sounds />
    </div>
  );
}
