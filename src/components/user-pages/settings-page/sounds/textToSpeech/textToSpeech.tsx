import { useAppSelector } from "@/src/app/hooks";
import { toast } from "react-toastify";
import { textToSpeechReducer } from "@/src/redux/slices/settingStateSlice";
import { useAppDispatch } from "@/src/app/hooks";
import { db } from "@/src/services/db";
import LangDropdown from "./langDropDown/langDropDown";
import CheckboxInput from "@/src/components/general/checkBoxInput/input";

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

  return (
    <div className="w-full flex flex-col lg:flex-row justify-between">
      <CheckboxInput
        value="Activate Pronunciation"
        status={isTextToSpeechOn}
        handleInputChange={handleInputChange}
      />
      <LangDropdown />
    </div>
  );
}
