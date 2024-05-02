import React, { useEffect } from "react";
import CheckboxInput from "../../../general/checkBoxInput/input";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { textToSpeechReducer } from "@/src/redux/slices/settingStateSlice";
import { SettingTypes } from "@/src/types/interface";
import { toast } from "react-toastify";

export default function TextToSpeech() {
  const { setting } = useAppSelector((state) => state.settingState);
  const dispatch = useAppDispatch();



  const handleInputChange = () => {
    const appData = getAppDataHandler();
    if (appData.settings) {
      appData.settings = {
        ...appData.settings,
        isTextToSpeechOn: !setting.isTextToSpeechOn,
      };
      localStorage.setItem("appData", JSON.stringify(appData));
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
