import React, { useEffect } from "react";
import Sounds from "./sounds/sounds";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";

export default function AppSettingsPage() {
  useEffect(() => {
    const appData = getAppDataHandler();
    if (!appData.settings) {
      appData.settings = {
        isSoundOn: false,
        isTextToSpeechOn: false,
        isDictionaryOn: false,
        isTourOn: true,
      };
    }
    localStorage.setItem("appData", JSON.stringify(appData));
  }, []);

  return (
    <div>
      <Sounds />
    </div>
  );
}
