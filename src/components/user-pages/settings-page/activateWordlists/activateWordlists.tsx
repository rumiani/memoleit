import { useEffect, useState } from "react";
import { useAppSelector } from "@/src/app/hooks";
import { toast } from "react-toastify";
import { leitnerTextSelectionModeReducer } from "@/src/redux/slices/settingStateSlice";
import { useAppDispatch } from "@/src/app/hooks";
import { db } from "@/src/services/db";
import CheckboxInput from "@/src/components/general/checkBoxInput/input";
import { wordListTypes } from "@/src/types/interface";
import { isEmpty } from "lodash";
import { FaDownload } from "react-icons/fa6";
import ActivateWordList from "./activateWordList/activateWordList";

const defaultWordLists: wordListTypes[] = [
  { name: "11plus", lable: "11 plus", status: false, words: [] },
];

export default function ActivateWordLists() {
  const [wordLists, setWordLists] = useState<wordListTypes[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const initialisingWordLists = async () => {
      try {
        const setting = await db.setting
          .where("name")
          .equals("setting")
          .first();
        const existingWordIds = new Set(
          setting!.wordLists.map((word) => word.name),
        );
        const uniqueWords = defaultWordLists.filter(
          (word) => !existingWordIds.has(word.name),
        );
        setting?.wordLists.push(...uniqueWords);
        await db.setting.put(setting!);
        setWordLists(setting?.wordLists!);
      } catch (error) {
        console.log(error);
      }
    };
    initialisingWordLists();
  }, [dispatch]);

  return (
    <div className="w-full flex flex-col gap-x-4 justify-between">
      <strong>Select words lists</strong>
      {wordLists.map((wordList, i) => {
        console.log(wordList);
        
        return (
          <div key={i}>
            <ActivateWordList wordList={wordList} setWordLists={setWordLists} />
          </div>
        );
      })}
    </div>
  );
}
