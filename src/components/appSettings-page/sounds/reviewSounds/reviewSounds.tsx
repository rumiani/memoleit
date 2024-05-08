import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import CheckboxInput from "@/src/components/general/checkBoxInput/input";
import React, { useEffect, useState } from "react";
import DropDownSounds from "./dropDownSounds/dropDownSounds";
import { reviewSoundsReducer } from "@/src/redux/slices/settingStateSlice";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { toast } from "react-toastify";
import { reviewSounds } from "@/src/data/reviewSounds";
import { saveAppDataHandler } from "@/src/handlers/saveAppDataHandler";

export default function ReviewSounds() {
  const { setting } = useAppSelector((state) => state.settingState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { settings } = getAppDataHandler();    
    dispatch(reviewSoundsReducer({ ...settings.reviewSounds }));
  }, [dispatch]);

  const handleInputChange = () => {
    const appData = getAppDataHandler();
    if (appData.settings) {
      appData.settings.reviewSounds = {
        ...appData.settings.reviewSounds,
        isSoundOn: !setting.reviewSounds.isSoundOn,
      };
      saveAppDataHandler(appData)
    }
    dispatch(
      reviewSoundsReducer({ isSoundOn: !setting.reviewSounds.isSoundOn })
    );
    if (setting.reviewSounds.isSoundOn) {
      toast.success("Review sounds turned off");
    } else {
      toast.success("Review sounds turned on");
    }
  };

  const rightSoundSaveHander = (soundNumber: number) => {
    const appData = getAppDataHandler();
    if (appData.settings) {
      appData.settings.reviewSounds = {
        ...appData.settings.reviewSounds,
        right: soundNumber,
      };
      saveAppDataHandler(appData)
    }
    dispatch(reviewSoundsReducer({ right: soundNumber }));
    toast.success("Sound has changed");
  };
  const wrongSoundSaveHander = (soundNumber: number) => {
    const appData = getAppDataHandler();
    if (appData.settings) {
      appData.settings.reviewSounds = {
        ...appData.settings.reviewSounds,
        wrong: soundNumber,
      };
      saveAppDataHandler(appData)
    }
    dispatch(reviewSoundsReducer({ wrong: soundNumber }));
    toast.success("Sound has changed");
  };

  return (
    <div className="w-full flex flex-col">
      <CheckboxInput
        value="Review Sounds"
        status={setting.reviewSounds.isSoundOn}
        handleInputChange={handleInputChange}
      />
      <div className="flex flex-row justify-center">
      <div className="ml-10">
        <p className="text-center text-sm text-red-500 font-bold">I Do&apos;nt Know</p>
        <DropDownSounds
          value={setting.reviewSounds.wrong}
          SaveSoundHander={wrongSoundSaveHander}
          sounds={reviewSounds.wrong}
        />
      </div>
      <div className="ml-10">
        <p className="text-center text-sm text-green-600 font-bold">I Know</p>
        <DropDownSounds
          SaveSoundHander={rightSoundSaveHander}
          value={setting.reviewSounds.right}
          sounds={reviewSounds.right}
        />
      </div>
      </div>
    </div>
  );
}