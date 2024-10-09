import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { languages } from "@/src/data/languages";
import { textToSpeechLangReducer } from "@/src/redux/slices/settingStateSlice";
import { db } from "@/src/services/db";
import { LanguagesTypes } from "@/src/types/interface";
import { toast } from "react-toastify";

export default function LangDropdown() {
  const { textToSpeechLang } = useAppSelector((state) => state.settingState);
  const dispatch = useAppDispatch();
  const dropdownChangeHnadler = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    try {
      const langCode: string = event.target.value;

      await db.setting
        .where("name")
        .equals("setting")
        .modify({ textToSpeechLang: langCode });
      dispatch(textToSpeechLangReducer(langCode));
      toast.success("Text to speech language has changed.");
    } catch (error) {}
  };
  return (
    <div className="w-fit mx-auto lg:mx-0 mb-4">
      <select
        value={textToSpeechLang}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
        onChange={dropdownChangeHnadler}
      >
        {languages.map((lang: LanguagesTypes) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
