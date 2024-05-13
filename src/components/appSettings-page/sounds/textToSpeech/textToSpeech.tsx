import React, { useEffect } from "react";
import CheckboxInput from "../../../general/checkBoxInput/input";
import { useAppSelector } from "@/src/app/hooks";
import { toast } from "react-toastify";
import { textToSpeechReducer } from "@/src/redux/slices/settingStateSlice";
import { useAppDispatch } from "@/src/app/hooks";
import { db } from "@/src/services/db";

export default function TextToSpeech() {
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
  useEffect(() => {
    console.log(isTextToSpeechOn);
  }, [isTextToSpeechOn]);
  return (
    <>
      <CheckboxInput
        value="Activate Pronunciation"
        status={isTextToSpeechOn}
        handleInputChange={handleInputChange}
      />
    </>
  );
}
