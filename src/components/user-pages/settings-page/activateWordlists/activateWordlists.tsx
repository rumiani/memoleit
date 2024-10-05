import { useEffect, useState } from "react";
import { useAppDispatch } from "@/src/app/hooks";
import { db } from "@/src/services/db";
import { wordListTypes } from "@/src/types/interface";
import ActivateWordList from "./activateWordList/activateWordList";

const defaultWordLists: wordListTypes[] = [
  { name: "words11plus", lable: "11 plus", status: false, words: [] },
  { name: "words504", lable: "504", status: false, words: [] },
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
      <strong>Select word lists</strong>
      <div className="p-2 flex flex-wrap gap-2">
      {wordLists.map((wordList, i) => {
        return (
          <div key={i}>
            <ActivateWordList wordList={wordList} setWordLists={setWordLists} />
          </div>
        );
      })}
      </div>
    </div>
  );
}
