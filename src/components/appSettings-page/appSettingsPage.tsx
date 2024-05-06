import React, { useEffect } from "react";
import Sounds from "./sounds/sounds";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import AppSounds from "./sounds/reviewSounds/reviewSounds";
import { saveAppDataHandler } from "@/src/handlers/saveAppDataHandler";

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
    saveAppDataHandler(appData)
  }, []);

  return (
    <div className="w-full p-4 border border-gray-300 h-fit">
      <Sounds />
    </div>
  );
}
