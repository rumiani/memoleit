import React from "react";
import { useAppSelector } from "@/src/app/hooks";
import { toast } from "react-toastify";
import { textToSpeechReducer } from "@/src/redux/slices/settingStateSlice";
import { useAppDispatch } from "@/src/app/hooks";
import { db } from "@/src/services/db";
import CheckboxInput from "@/src/components/general/checkBoxInput/input";
export default function Mode() {
  const { isTextToSpeechOn } = useAppSelector((state) => state.settingState);
  const dispatch = useAppDispatch();

  const handleInputChange = () => {
    db.setting
      .where("name")
      .equals("setting")
      .modify({ isTextToSpeechOn: !isTextToSpeechOn })
      .then(() => {
        dispatch(textToSpeechReducer());

        if (isTextToSpeechOn) {
          toast.success("Pronunciation turned off");
        } else {
          toast.success("Pronunciation turned on");
        }
      });
  };

  return (
    <div className="w-full flex flex-wrap gap-x-4 justify-between">
      <CheckboxInput
        value="Dark Mode"
        status={isTextToSpeechOn}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}
