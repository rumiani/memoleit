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

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope,
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);
  const checkAndUpdateStatus = async () => {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      const messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = (event) => {
        console.log(event.data); // Handle the result from the service worker
      };

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
      await appDataInitialiser();
      db.setting
        .where("name")
        .equals("setting")
        .first()
        .then((setting) => {
          dispatch(storedSettingReducer(setting!));
        })
        .catch((error) => {
          console.log("Womething went wrong when trying to load the settings");
        });
    };
    appInitialisationHandler();
  }, [dispatch]);

  return (
    <>
      <AppLayoutComp />
      <div className="sm:ml-14 p-2">{children}</div>
    </>
  );
}
