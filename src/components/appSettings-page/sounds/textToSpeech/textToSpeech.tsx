import React, { useEffect } from "react";
import CheckboxInput from "../../../general/checkBoxInput/input";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { textToSpeechReducer } from "@/src/redux/slices/settingStateSlice";
import { SettingTypes } from "@/src/types/interface";
import { toast } from "react-toastify";
import { saveAppDataHandler } from "@/src/handlers/saveAppDataHandler";

export default function TextToSpeech() {
  const { setting } = useAppSelector((state) => state.settingState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { settings } = getAppDataHandler();
    dispatch(textToSpeechReducer(settings.isTextToSpeechOn));
  },[dispatch]);

  const handleInputChange = () => {
    const appData = getAppDataHandler();
    if (appData.settings) {
      appData.settings = {
        ...appData.settings,
        isTextToSpeechOn: !setting.isTextToSpeechOn,
      };
      saveAppDataHandler(appData)
    }
    dispatch(textToSpeechReducer(!setting.isTextToSpeechOn));

    if (setting.isTextToSpeechOn) {
      toast.success("Pronunciation turned off");
    } else {
      toast.success("Pronunciation turned on");
    }
  };

  return (
    <>
      <CheckboxInput
        value="Activate Pronunciation"
        status={setting.isTextToSpeechOn}
        handleInputChange={handleInputChange}
      />
    </>
  );
}
