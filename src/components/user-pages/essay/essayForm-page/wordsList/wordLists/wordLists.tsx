import React, { useEffect, useState } from "react";
import WordList from "./wordList/wordList";
import { wordListTypes } from "@/src/types/interface";
import { db } from "@/src/services/db";
import { isEmpty } from "lodash";
import Link from "next/link";

export default function WordLists() {
  const [wordLists, setWordLists] = useState<wordListTypes[]>([]);
  const [noListDownloaded, setNoListDownloaded] = useState<boolean>();

  useEffect(() => {    
    const fetchWordLists = async () => {
      const setting = await db.setting.where("name").equals("setting").first();      
      if (setting?.wordLists!) {
        setWordLists(setting?.wordLists);
        const isAnyListDownloaded = setting?.wordLists!.some(
          (wordList) => !isEmpty(wordList.words),
        );        
        setNoListDownloaded(!isAnyListDownloaded);
      }
    };
    fetchWordLists();
  }, []);
  return (
    <div className="flex flex-wrap">
      {noListDownloaded && (
        <Link href="/user/settings?highlight=targetComponent">
          <button className="secondaryBtn !w-fit">Add a word list</button>
        </Link>
      )}
      {wordLists.map((wordList, i) => {
        return (
          <div key={i} className="m-1">
            {wordList.status && <WordList wordList={wordList} />}
          </div>
        );
      })}
    </div>
  );
}
