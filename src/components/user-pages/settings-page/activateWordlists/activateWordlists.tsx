"use client";
import { useEffect, useRef, useState } from "react";
import { db } from "@/src/services/db";
import { wordListTypes } from "@/src/types/interface";
import ActivateWordList from "./activateWordList/activateWordList";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const defaultWordLists: wordListTypes[] = [
  { name: "words11plus", lable: "11 plus", status: false, words: [] },
  { name: "words504", lable: "504", status: false, words: [] },
];

export default function ActivateWordLists() {
  const searchParams = useSearchParams();
  const targetRef = useRef<HTMLDivElement>(null);
  const [wordLists, setWordLists] = useState<wordListTypes[]>([]);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    const initialisingWordLists = async () => {
      try {
        const setting = await db.setting
          .where("name")
          .equals("setting")
          .first();
        if (setting) {
          const existingWordIds = new Set(
            setting!.wordLists.map((word) => word.name),
          );
          const uniqueWords = defaultWordLists.filter(
            (word) => !existingWordIds.has(word.name),
          );
          setting?.wordLists.push(...uniqueWords);
          await db.setting.put(setting!);
          setWordLists(setting?.wordLists!);
        }
      } catch (error) {}
    };
    initialisingWordLists();
  }, []);

  useEffect(() => {
    const highlight = searchParams.get("highlight");
    if (highlight === "targetComponent" && targetRef.current) {
      setHighlight(true);
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      toast.info("Download and add some word lists");
      setTimeout(() => setHighlight(false), 3000);
    }
  }, [searchParams]);
  return (
    <div
      ref={targetRef}
      className={` ${highlight ? "highlight" : ""} target-component w-full flex flex-col gap-x-4 justify-between`}
    >
      <strong>Select word lists</strong>
      <div className="p-2 flex flex-wrap gap-2">
        {wordLists.map((wordList, i) => {
          return (
            <div key={i}>
              <ActivateWordList
                wordList={wordList}
                setWordLists={setWordLists}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
