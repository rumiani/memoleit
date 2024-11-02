"use client";

import AppLayoutComp from "@/src/components/general/layouts/sideBarLayout/appLayout";
import { appDataInitialiser } from "@/src/handlers/appDataInitialiser";
import { db } from "@/src/services/db";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import {
  leitnerTextSelectionModeReducer,
  storedSettingReducer,
} from "@/src/redux/slices/settingStateSlice";
import { useSession } from "next-auth/react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {})
        .catch((error) => {});
    }
  }, []);
  const checkAndUpdateStatus = async () => {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      const messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = (event) => {};

      navigator.serviceWorker.controller.postMessage({ type: "CHECK_STATUS" }, [
        messageChannel.port2,
      ]);
    }
  };

  useEffect(() => {
    // Call this function when you want to check and update the status
    checkAndUpdateStatus();
  }, []);

  useEffect(() => {
    const appInitialisationHandler = async () => {
      await appDataInitialiser(session);
      db.setting
        .where("name")
        .equals("setting")
        .first()
        .then((setting) => {
          dispatch(storedSettingReducer(setting!));
        })
        .catch((error) => {});
    };
    appInitialisationHandler();
  }, [dispatch, session]);

  return (
    <div>
      <AppLayoutComp />
      <div className="sm:ml-14 p-2 sm:px-4 pb-16 sm:pb-0">
        {children}
      </div>
    </div>
  );
}
