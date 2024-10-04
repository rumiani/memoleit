import React, { useEffect, useState } from "react";
import WordList from "./wordList/wordList";
import { wordListTypes } from "@/src/types/interface";
import { db } from "@/src/services/db";
import { isEmpty } from "lodash";
export default function WordLists() {
  const [wordLists, setWordLists] = useState<wordListTypes[]>([]);
  useEffect(() => {
    const fetchWordLists = async () => {
      const setting = await db.setting.where("name").equals("setting").first();
      setWordLists(setting?.wordLists!);
    };
    fetchWordLists();
  }, []);
  return (
    <div className="m-2">
      {!isEmpty(wordLists) &&
        wordLists.map((wordList, i) => {
          return (
            <div key={i}>
              {wordList.status && <WordList wordList={wordList} />}
            </div>
          );
        })}
    </div>
  );
}
