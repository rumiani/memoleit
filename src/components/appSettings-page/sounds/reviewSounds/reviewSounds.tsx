import React from "react";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import CheckboxInput from "@/src/components/general/checkBoxInput/input";
import DropDownSounds from "./dropDownSounds/dropDownSounds";
import { toast } from "react-toastify";
import { reviewSounds } from "@/src/data/reviewSounds";
import {
  reviewSoundsReducer,
  rightAnswerSoundSrcReducer,
  wrongAnswerSoundSrcReducer,
} from "@/src/redux/slices/settingStateSlice";
import { db } from "@/src/services/db";

export default function ReviewSounds() {
  const { isReviewSoundOn, wrongAnswerSoundSrc, rightAnswerSoundSrc } =
    useAppSelector((state) => state.settingState);
  const dispatch = useAppDispatch();

  const handleInputChange = () => {
    db.setting
      .where("name")
      .equals("setting")
      .modify({ isReviewSoundOn: !isReviewSoundOn })
      .then((res) => {
        console.log(res);
        dispatch(reviewSoundsReducer(!isReviewSoundOn));
      })
      .catch(() => {
        console.log("error");
      });
    if (isReviewSoundOn) {
      toast.success("Review sounds turned off");
    } else {
      toast.success("Review sounds turned on");
    }
  };

  const rightSoundSaveHander = (soundSrc: string) => {
    db.setting
      .where("name")
      .equals("setting")
      .modify({ rightAnswerSoundSrc: soundSrc })
      .then(() => {
        dispatch(rightAnswerSoundSrcReducer(soundSrc));
        toast.success("Sound has changed");
      })
      .catch(() => {
        console.log("Error");
      });
  };
  const wrongSoundSaveHander = (soundSrc: string) => {
    db.setting
      .where("name")
      .equals("setting")
      .modify({ wrongAnswerSoundSrc: soundSrc })
      .then(() => {
        dispatch(wrongAnswerSoundSrcReducer(soundSrc));
        toast.success("Sound has changed");
      })
      .catch(() => {
        console.log("Error");
      });
  };

  return (
    <div className="w-full flex flex-wrap gap-x-4  justify-between">
      <CheckboxInput
        value="Review Sounds"
        status={isReviewSoundOn}
        handleInputChange={handleInputChange}
      />
      <div className="flex flex-row justify-center">
        <div className="">
          <p className="text-center text-sm text-red-500 font-bold">
            I Do&apos;nt Know
          </p>
          <DropDownSounds
            soundSrc={wrongAnswerSoundSrc}
            SaveSoundHander={wrongSoundSaveHander}
            sounds={reviewSounds.wrong}
          />
        </div>
        <div className="ml-10">
          <p className="text-center text-sm text-green-600 font-bold">I Know</p>
          <DropDownSounds
            SaveSoundHander={rightSoundSaveHander}
            soundSrc={rightAnswerSoundSrc}
            sounds={reviewSounds.right}
          />
        </div>
      </div>
    </div>
  );
}
